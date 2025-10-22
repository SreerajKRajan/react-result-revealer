import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Download, Phone, Mail, Globe, Calendar } from 'lucide-react';
import { ResultStatement } from '@/types/questionnaire';
import { useRef, useState } from 'react';
import html2pdf from 'html2pdf.js';
import { jsPDF } from 'jspdf';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { UserInfo } from './UserInfoForm';


interface ResultsScreenProps {
  results: ResultStatement[];
  thankYouData: {
    title: string;
    introduction: string;
    benefits: string[];
    goals: string[];
    closingStatement: string;
  };
  onReview: () => void;
  userInfo: UserInfo | null;
}

export const ResultsScreen = ({ results, thankYouData, onReview, userInfo }: ResultsScreenProps) => {
  const printRef = useRef<HTMLDivElement>(null);
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);

  // Function to split full name into first and last name
  const splitName = (fullName: string) => {
    const parts = fullName.trim().split(' ');
    if (parts.length === 1) {
      return { firstName: parts[0], lastName: '' };
    }
    const firstName = parts[0];
    const lastName = parts.slice(1).join(' ');
    return { firstName, lastName };
  };

  // Construct booking URL with user info
  const getBookingUrl = () => {
    if (!userInfo) return '';
    
    const { firstName, lastName } = splitName(userInfo.name);
    const params = new URLSearchParams({
      first_name: firstName,
      last_name: lastName,
      email: userInfo.email,
      phone: userInfo.phone,
    });
    
    return `https://api.leadconnectorhq.com/widget/booking/x4vi85Pz2LuLzmS5lGCd?${params.toString()}`;
  };

  // Function to parse text with bold and italic formatting
  const parseFormattedText = (text: string) => {
    const parts: JSX.Element[] = [];
    let lastIndex = 0;
    let key = 0;

    // Match **bold** and *italic* patterns
    const regex = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
    let match;

    while ((match = regex.exec(text)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(
          <span key={key++}>{text.substring(lastIndex, match.index)}</span>
        );
      }

      const matched = match[0];
      if (matched.startsWith('**') && matched.endsWith('**')) {
        // Bold text
        parts.push(
          <strong key={key++} className="font-bold text-foreground">
            {matched.slice(2, -2)}
          </strong>
        );
      } else if (matched.startsWith('*') && matched.endsWith('*')) {
        // Italic text
        parts.push(
          <em key={key++} className="italic">
            {matched.slice(1, -1)}
          </em>
        );
      }

      lastIndex = regex.lastIndex;
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push(<span key={key++}>{text.substring(lastIndex)}</span>);
    }

    return parts.length > 0 ? parts : text;
  };

  const handleDownloadPDF = () => {
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 20;
    const maxWidth = pageWidth - (margin * 2);
    let yPosition = margin;

    // Helper function to add text with word wrap
    const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000', indent: number = 0) => {
      pdf.setFontSize(fontSize);
      pdf.setFont('helvetica', isBold ? 'bold' : 'normal');
      
      // Convert hex color to RGB
      const r = parseInt(color.slice(1, 3), 16);
      const g = parseInt(color.slice(3, 5), 16);
      const b = parseInt(color.slice(5, 7), 16);
      pdf.setTextColor(r, g, b);

      const lines = pdf.splitTextToSize(text, maxWidth - indent);
      const lineHeight = fontSize * 0.4;
      
      lines.forEach((line: string, index: number) => {
        if (yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + indent, yPosition);
        yPosition += lineHeight;
      });
      
      yPosition += 2;
    };

    // Helper for bullet points with symbols
    const addBulletPoint = (text: string, symbol: '✓' | '✗' | '•', fontSize: number = 11) => {
      const symbolColor = symbol === '✓' ? '#2563eb' : symbol === '✗' ? '#dc2626' : '#000000';
      
      // Add the symbol
      pdf.setFontSize(fontSize);
      pdf.setTextColor(symbolColor === '#2563eb' ? 37 : symbolColor === '#dc2626' ? 220 : 0, 
                       symbolColor === '#2563eb' ? 99 : symbolColor === '#dc2626' ? 38 : 0, 
                       symbolColor === '#2563eb' ? 235 : symbolColor === '#dc2626' ? 38 : 0);
      
      if (yPosition + fontSize * 0.4 > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      
      pdf.text(symbol, margin, yPosition);
      
      // Add the text with indent
      pdf.setTextColor(0, 0, 0);
      const lines = pdf.splitTextToSize(text, maxWidth - 8);
      const lineHeight = fontSize * 0.4;
      
      lines.forEach((line: string, index: number) => {
        if (index > 0 && yPosition + lineHeight > pageHeight - margin) {
          pdf.addPage();
          yPosition = margin;
        }
        pdf.text(line, margin + 8, yPosition);
        if (index < lines.length - 1) {
          yPosition += lineHeight;
        }
      });
      
      yPosition += lineHeight + 2;
    };

    // Add spacing
    const addSpace = (space: number = 5) => {
      yPosition += space;
    };

    // Title
    addText(thankYouData.title, 18, true);
    addSpace(5);

    // Introduction
    addText(thankYouData.introduction, 11);
    addSpace(5);

    // Benefits section
    addText('The results of this questionnaire are important because they:', 11, true);
    addSpace(3);

    thankYouData.benefits.forEach((benefit) => {
      addBulletPoint(benefit, '✓', 11);
    });
    addSpace(5);

    // ATG Section
    addText('At ATG – Advanced Tax Group, we use these results to provide guidance and recommendations. While we offer professional insight, remember that you are ultimately responsible for implementing any strategies. Proper documentation, timing, and adherence to IRS rules are essential to fully realize the benefits of these planning strategies.', 11);
    addSpace(5);

    addText('By carefully reviewing your results and acting on the opportunities identified, you are taking a critical step toward:', 11);
    addSpace(3);

    thankYouData.goals.forEach((goal) => {
      addBulletPoint(goal, '•', 11);
    });
    addSpace(5);

    addText(thankYouData.closingStatement, 11, true);
    addSpace(10);

    // Results
    if (results.length > 0) {
      addText('Your Personalized Strategies', 16, true);
      addSpace(8);

      results.forEach((result, index) => {
        // Result title
        addText(result.title, 13, true, '#2563eb');
        addSpace(4);

        // Parse and format content
        const paragraphs = result.content.split('\n\n');
        
        paragraphs.forEach((paragraph) => {
          // Check if it's a heading
          if (paragraph.match(/^[A-Z][^.!?]*$/m) && paragraph.length < 100) {
            addSpace(3);
            addText(paragraph, 12, true);
            addSpace(2);
          }
          // Check if it's a bullet list
          else if (paragraph.includes('•') || paragraph.includes('✓') || paragraph.includes('✗')) {
            const lines = paragraph.split('\n');
            lines.forEach((line) => {
              if (line.trim()) {
                const trimmedLine = line.trim();
                if (trimmedLine.startsWith('✓')) {
                  addBulletPoint(trimmedLine.substring(1).trim(), '✓', 11);
                } else if (trimmedLine.startsWith('✗')) {
                  addBulletPoint(trimmedLine.substring(1).trim(), '✗', 11);
                } else if (trimmedLine.startsWith('•')) {
                  addBulletPoint(trimmedLine.substring(1).trim(), '•', 11);
                } else {
                  addText(trimmedLine, 11);
                }
              }
            });
            addSpace(2);
          }
          // Regular paragraph
          else {
            addText(paragraph, 11);
            addSpace(3);
          }
        });

        // Add space between results
        if (index < results.length - 1) {
          addSpace(8);
        }
      });
    } else {
      addText('Based on your responses, we\'ll provide personalized recommendations during your consultation with ATG – Advanced Tax Group.', 11);
    }

    // Save the PDF
    pdf.save('ATG-Tax-Planning-Results.pdf');
  };

  return (
    <>
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-content, #printable-content * {
            visibility: visible;
          }
          #printable-content {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
          .print-break {
            page-break-after: always;
          }
        }
      `}</style>
      
      {/* Sticky Contact Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-primary text-primary-foreground shadow-lg z-50 no-print">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <a href="tel:+1234567890" className="hover:underline font-medium">
                (123) 456-7890
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <a href="mailto:contact@atgtax.com" className="hover:underline font-medium">
                contact@atgtax.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              <a href="https://atgtax.com" target="_blank" rel="noopener noreferrer" className="hover:underline font-medium">
                atgtax.com
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 py-12 pb-24">
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in" id="printable-content" ref={printRef}>
          {/* Header */}
          <Card className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {thankYouData.title}
            </h1>

            <div className="space-y-4 text-foreground/90">
              <p className="leading-relaxed text-base">
                {parseFormattedText(thankYouData.introduction)}
              </p>

              <div className="space-y-3 pt-4">
                <p className="font-bold text-foreground text-lg">
                  The results of this questionnaire are important because they:
                </p>
                <ul className="space-y-2">
                  {thankYouData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-base">{parseFormattedText(benefit)}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 space-y-3">
                <p className="leading-relaxed text-base">
                  At <strong className="font-bold">ATG – Advanced Tax Group</strong>, we use these results to provide guidance and recommendations. While we offer professional insight, remember that <strong className="font-bold">you are ultimately responsible for implementing any strategies</strong>. Proper documentation, timing, and adherence to IRS rules are essential to fully realize the benefits of these planning strategies.
                </p>

                <p className="leading-relaxed text-base font-medium">
                  By carefully reviewing your results and acting on the opportunities identified, you are taking a critical step toward:
                </p>

                <ul className="space-y-2 pl-6">
                  {thankYouData.goals.map((goal, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-primary font-bold">•</span>
                      <span className="text-base italic">{parseFormattedText(goal)}</span>
                    </li>
                  ))}
                </ul>

                <p className="leading-relaxed pt-4 font-bold text-foreground text-base">
                  {parseFormattedText(thankYouData.closingStatement)}
                </p>
              </div>
            </div>
          </Card>

          {/* Result Statements */}
          {results.length > 0 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground px-1">
                Your Personalized Strategies
              </h2>
              
              {results.map((result, index) => (
                <Card key={result.id} className="p-6 md:p-8">
                  <h3 className="text-xl font-bold text-primary mb-4">
                    {parseFormattedText(result.title)}
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    {result.content.split('\n\n').map((paragraph, idx) => {
                      // Handle headings
                      if (paragraph.match(/^[A-Z][^.!?]*$/m) && paragraph.length < 100) {
                        return (
                          <h4 key={idx} className="text-lg font-bold text-foreground mt-6 mb-3">
                            {parseFormattedText(paragraph)}
                          </h4>
                        );
                      }
                      
                      // Handle bullet points with better symbols
                      if (paragraph.includes('•') || paragraph.includes('✓') || paragraph.includes('✗') || paragraph.includes('□') || paragraph.includes('-')) {
                        const lines = paragraph.split('\n');
                        return (
                          <ul key={idx} className="space-y-2 my-4">
                            {lines.map((line, lineIdx) => {
                              if (line.trim()) {
                                const cleanLine = line.replace(/^[•✓✗□\-]\s*/, '');
                                const icon = line.match(/^([•✓✗□\-])/)?.[1];
                                
                                let iconElement;
                                let iconClass = 'flex-shrink-0';
                                
                                if (icon === '✓') {
                                  iconElement = <CheckCircle2 className={`w-4 h-4 text-primary ${iconClass}`} />;
                                } else if (icon === '✗') {
                                  iconElement = <span className={`text-destructive font-bold ${iconClass}`}>✗</span>;
                                } else {
                                  iconElement = <span className={`text-primary font-bold ${iconClass}`}>•</span>;
                                }
                                
                                return (
                                  <li key={lineIdx} className="flex items-start gap-2">
                                    {iconElement}
                                    <span className="text-foreground/90 text-base italic">
                                      {parseFormattedText(cleanLine)}
                                    </span>
                                  </li>
                                );
                              }
                              return null;
                            })}
                          </ul>
                        );
                      }
                      
                      // Regular paragraphs
                      return (
                        <p key={idx} className="text-foreground/90 leading-relaxed my-4 text-base">
                          {parseFormattedText(paragraph)}
                        </p>
                      );
                    })}
                  </div>
                </Card>
              ))}
            </div>
          )}

          {results.length === 0 && (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">
                Based on your responses, we'll provide personalized recommendations during your consultation with ATG – Advanced Tax Group.
              </p>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-4 justify-center pt-4 no-print">
            <Button
              variant="outline"
              onClick={onReview}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Review Answers
            </Button>
            <Button
              onClick={handleDownloadPDF}
              className="gap-2"
              variant="outline"
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
            <Button
              onClick={() => setIsScheduleDialogOpen(true)}
              className="gap-2"
            >
              <Calendar className="w-4 h-4" />
              Schedule a Call
            </Button>
          </div>
        </div>
      </div>

      {/* Schedule Call Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] p-0">
          <DialogHeader className="p-6 pb-0">
            <DialogTitle>Schedule a Call with ATG</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full p-6 pt-2">
            <iframe
              src={getBookingUrl()}
              className="w-full h-full border-0 rounded-lg"
              title="Schedule a Call"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
