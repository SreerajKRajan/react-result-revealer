import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, ArrowLeft, Download } from 'lucide-react';
import { ResultStatement } from '@/types/questionnaire';
import { useRef } from 'react';
import html2pdf from 'html2pdf.js';

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
}

export const ResultsScreen = ({ results, thankYouData, onReview }: ResultsScreenProps) => {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = () => {
    if (printRef.current) {
      const options = {
        margin: 10,
        filename: 'ATG-Tax-Planning-Results.pdf',
        image: { type: 'jpeg' as const, quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: 'mm' as const, format: 'a4' as const, orientation: 'portrait' as const }
      };
      
      html2pdf().set(options).from(printRef.current).save();
    }
  };

  return (
    <>
      <style>{`
        .pdf-content {
          background: white;
          color: #1a1a1a;
          font-family: 'Arial', sans-serif;
          line-height: 1.6;
          padding: 40px;
        }
        .pdf-header {
          text-align: center;
          margin-bottom: 40px;
          padding-bottom: 20px;
          border-bottom: 3px solid #0066cc;
        }
        .pdf-title {
          font-size: 28px;
          font-weight: bold;
          color: #0066cc;
          margin-bottom: 10px;
        }
        .pdf-section {
          margin-bottom: 30px;
          page-break-inside: avoid;
        }
        .pdf-section-title {
          font-size: 20px;
          font-weight: bold;
          color: #0066cc;
          margin-bottom: 15px;
          padding-bottom: 8px;
          border-bottom: 2px solid #e0e0e0;
        }
        .pdf-text {
          font-size: 12px;
          color: #333;
          margin-bottom: 12px;
        }
        .pdf-list {
          margin: 15px 0;
          padding-left: 20px;
        }
        .pdf-list-item {
          margin-bottom: 8px;
          font-size: 12px;
          color: #333;
        }
        .pdf-strategy {
          background: #f8f9fa;
          padding: 20px;
          margin-bottom: 20px;
          border-left: 4px solid #0066cc;
          page-break-inside: avoid;
        }
        .pdf-strategy-title {
          font-size: 16px;
          font-weight: bold;
          color: #0066cc;
          margin-bottom: 12px;
        }
      `}</style>
      
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 p-4 py-12">
        {/* Hidden PDF Content */}
        <div style={{ position: 'absolute', left: '-9999px' }} ref={printRef}>
          <div className="pdf-content">
            <div className="pdf-header">
              <div className="pdf-title">ATG – Advanced Tax Group</div>
              <div className="pdf-title">Tax Planning Results</div>
            </div>

            <div className="pdf-section">
              <div className="pdf-section-title">{thankYouData.title}</div>
              <div className="pdf-text">{thankYouData.introduction}</div>
              
              <div className="pdf-text" style={{ fontWeight: 'bold', marginTop: '20px' }}>
                The results of this questionnaire are important because they:
              </div>
              <ul className="pdf-list">
                {thankYouData.benefits.map((benefit, index) => (
                  <li key={index} className="pdf-list-item">✓ {benefit}</li>
                ))}
              </ul>

              <div className="pdf-text" style={{ marginTop: '20px' }}>
                At <strong>ATG – Advanced Tax Group</strong>, we use these results to provide guidance and recommendations. While we offer professional insight, remember that <strong>you are ultimately responsible for implementing any strategies</strong>. Proper documentation, timing, and adherence to IRS rules are essential to fully realize the benefits of these planning strategies.
              </div>

              <div className="pdf-text">
                By carefully reviewing your results and acting on the opportunities identified, you are taking a critical step toward:
              </div>

              <ul className="pdf-list">
                {thankYouData.goals.map((goal, index) => (
                  <li key={index} className="pdf-list-item">{goal}</li>
                ))}
              </ul>

              <div className="pdf-text" style={{ fontWeight: 'bold', marginTop: '15px' }}>
                {thankYouData.closingStatement}
              </div>
            </div>

            {results.length > 0 && (
              <div className="pdf-section">
                <div className="pdf-section-title">Your Personalized Strategies</div>
                
                {results.map((result) => (
                  <div key={result.id} className="pdf-strategy">
                    <div className="pdf-strategy-title">{result.title}</div>
                    {result.content.split('\n\n').map((paragraph, idx) => {
                      if (paragraph.includes('•') || paragraph.includes('✓') || paragraph.includes('✗') || paragraph.includes('□')) {
                        const lines = paragraph.split('\n');
                        return (
                          <ul key={idx} className="pdf-list" style={{ marginTop: '10px' }}>
                            {lines.map((line, lineIdx) => {
                              if (line.trim()) {
                                const cleanLine = line.replace(/^[•✓✗□]\s*/, '');
                                const icon = line.match(/^([•✓✗□])/)?.[1] || '•';
                                return (
                                  <li key={lineIdx} className="pdf-list-item">
                                    {icon} {cleanLine}
                                  </li>
                                );
                              }
                              return null;
                            })}
                          </ul>
                        );
                      }
                      
                      if (paragraph.match(/^[A-Z][^.!?]*$/m) && paragraph.length < 100) {
                        return (
                          <div key={idx} className="pdf-text" style={{ fontWeight: 'bold', marginTop: '15px' }}>
                            {paragraph}
                          </div>
                        );
                      }
                      
                      return (
                        <div key={idx} className="pdf-text">
                          {paragraph}
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Visible Web Content */}
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
          {/* Header */}
          <Card className="p-8 md:p-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              {thankYouData.title}
            </h1>

            <div className="space-y-4 text-foreground/90">
              <p className="leading-relaxed">
                {thankYouData.introduction}
              </p>

              <div className="space-y-3 pt-4">
                <p className="font-semibold text-foreground">
                  The results of this questionnaire are important because they:
                </p>
                <ul className="space-y-2">
                  {thankYouData.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 space-y-3">
                <p className="leading-relaxed">
                  At <strong>ATG – Advanced Tax Group</strong>, we use these results to provide guidance and recommendations. While we offer professional insight, remember that <strong>you are ultimately responsible for implementing any strategies</strong>. Proper documentation, timing, and adherence to IRS rules are essential to fully realize the benefits of these planning strategies.
                </p>

                <p className="leading-relaxed">
                  By carefully reviewing your results and acting on the opportunities identified, you are taking a critical step toward:
                </p>

                <ul className="space-y-2 pl-6">
                  {thankYouData.goals.map((goal, index) => (
                    <li key={index} className="list-disc text-foreground/90">
                      {goal}
                    </li>
                  ))}
                </ul>

                <p className="leading-relaxed pt-4 font-medium">
                  {thankYouData.closingStatement}
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
                    {result.title}
                  </h3>
                  <div className="prose prose-sm max-w-none">
                    {result.content.split('\n\n').map((paragraph, idx) => {
                      // Handle headings
                      if (paragraph.match(/^[A-Z][^.!?]*$/m) && paragraph.length < 100) {
                        return (
                          <h4 key={idx} className="text-lg font-semibold text-foreground mt-6 mb-3">
                            {paragraph}
                          </h4>
                        );
                      }
                      
                      // Handle bullet points
                      if (paragraph.includes('•') || paragraph.includes('✓') || paragraph.includes('✗') || paragraph.includes('□')) {
                        const lines = paragraph.split('\n');
                        return (
                          <ul key={idx} className="space-y-2 my-4">
                            {lines.map((line, lineIdx) => {
                              if (line.trim()) {
                                const cleanLine = line.replace(/^[•✓✗□]\s*/, '');
                                const icon = line.match(/^([•✓✗□])/)?.[1];
                                return (
                                  <li key={lineIdx} className="flex items-start gap-2">
                                    <span className={`flex-shrink-0 ${
                                      icon === '✓' ? 'text-primary' : 
                                      icon === '✗' ? 'text-destructive' : 
                                      'text-foreground/60'
                                    }`}>
                                      {icon || '•'}
                                    </span>
                                    <span className="text-foreground/90">{cleanLine}</span>
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
                        <p key={idx} className="text-foreground/90 leading-relaxed my-4">
                          {paragraph}
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
          <div className="flex gap-4 justify-center pt-4 no-print">
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
            >
              <Download className="w-4 h-4" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
