import { QuestionnaireData } from '@/types/questionnaire';

export const questionnaireData: QuestionnaireData = {
  welcome: {
    title: "Welcome to Your Tax Planning Questionnaire",
    introduction: [
      "Thank you for taking the time to complete this questionnaire. The purpose of this form is to help identify tax-saving opportunities and plan strategies that may reduce your tax liability while keeping you fully compliant with IRS guidelines.",
      "At Advanced Tax Group, we provide guidance and recommendations, but it's important to understand that you are ultimately responsible for the implementation of any strategies. Our role is to educate you, provide professional advice, and help you follow the rules — you make the decisions and take the actions to implement them."
    ],
    areas: [
      "S-Corp election strategies for business income",
      "The Augusta Rule for personal residence rentals",
      "Paying your children for legitimate work",
      "Vehicle and equipment deductions",
      "Start-up and organizational costs",
      "Home office, professional services, marketing, travel, and meals",
      "Retirement planning and the Solo 401(k)"
    ],
    disclaimer: "By providing accurate and complete information, you help us ensure that all recommendations we make are tailored to your unique situation and fully compliant with IRS rules.",
    compliance: "We're here to guide you every step of the way, answer your questions, and help you make the most of your tax planning opportunities."
  },
  sections: [
    {
      id: "section-1",
      title: "Section 1: General Information",
      questions: [
        {
          id: "q1-structure",
          text: "What is your current business structure?",
          type: "single-choice",
          options: [
            { value: "sole-proprietor", label: "Sole Proprietor" },
            { value: "llc", label: "LLC" },
            { value: "s-corp", label: "S-Corp" },
            { value: "c-corp", label: "C-Corp" },
            { value: "partnership", label: "Partnership" }
          ]
        },
        {
          id: "q1-years",
          text: "How many years have you been in business?",
          type: "numeric",
          validation: {
            min: 0,
            required: true
          }
        },
        {
          id: "q1-revenue",
          text: "What is your approximate annual net revenue?",
          type: "numeric",
          validation: {
            min: 0,
            required: true
          }
        },
        {
          id: "q1-accountant",
          text: "Do you currently have an accountant or bookkeeper helping you with your finances?",
          type: "yes-no"
        }
      ]
    },
    {
      id: "section-2",
      title: "Section 2: Augusta Rule (Home Rental to Business)",
      questions: [
        {
          id: "q2-own-home",
          text: "Do you own your personal residence?",
          type: "yes-no"
        },
        {
          id: "q2-business-meetings",
          text: "Do you host business meetings, retreats, or company events that could be held at your home?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q2-own-home",
            value: "yes"
          }
        },
        {
          id: "q2-days-per-year",
          text: "If yes, how many days per year do you typically use your home for business-related events?",
          type: "numeric",
          validation: {
            min: 0,
            max: 14
          },
          conditionalOn: {
            questionId: "q2-business-meetings",
            value: "yes"
          }
        },
        {
          id: "q2-documentation",
          text: "Would you be open to documenting and charging fair market rent for your business to use your home?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q2-business-meetings",
            value: "yes"
          }
        }
      ]
    },
    {
      id: "section-3",
      title: "Section 3: Paying Your Kids",
      questions: [
        {
          id: "q3-has-children",
          text: "Do you have children who are 18 years old or younger?",
          type: "yes-no"
        },
        {
          id: "q3-legitimate-work",
          text: "Could your children perform legitimate work for your business (e.g., filing, social media, cleaning, data entry)?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q3-has-children",
            value: "yes"
          }
        },
        {
          id: "q3-willing-to-document",
          text: "Would you be willing to document their work, pay them a reasonable wage, and maintain proper records?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q3-legitimate-work",
            value: "yes"
          }
        }
      ]
    }
  ],
  results: [
    {
      id: "result-scorp-55k",
      title: "How an S Corporation Can Help You If You Have Active Income Over $55,000",
      content: "Not all income is treated the same by the IRS. The S-Corp strategy only applies to active business income — meaning money you earn from actively running a trade or business.\n\nPassive income, such as rental income, dividends, interest, or capital gains, does not qualify for S-Corp tax savings.\n\nWhy the S-Corp Helps With Active Income\n\nWhen you're a sole proprietor or single-member LLC, all of your net active business income is subject to self-employment tax (Social Security and Medicare). That tax rate is 15.3%, on top of your regular federal and state income taxes.\n\nExample without an S-Corp:\n• Net active income: $70,000\n• Self-employment tax: about $10,700\n• Plus regular income tax.\n\nHow the S-Corp Saves You Money\n\n1. You elect for your business to be taxed as an S Corporation.\n2. You pay yourself a reasonable salary for the work you do in the business. This salary is subject to payroll taxes.\n3. The rest of your profits are taken as distributions, which are not subject to self-employment tax.\n\nExample with an S-Corp:\n• Net active income: $80,000\n• Pay yourself a reasonable salary: $45,000 (subject to payroll tax).\n• Take the remaining $35,000 as a distribution (not subject to self-employment tax).\n• That shift saves $5,000–$7,000+ per year, depending on your state and income level.\n\nWhy the $55,000 Threshold Matters\n\nIf your active business income is under ~$40k–50k, the compliance costs of an S-Corp (payroll, bookkeeping, filings) can outweigh the tax savings.\n\nBut once you're consistently earning $55,000+ in active income, there's typically enough profit to make the S-Corp structure worth it.\n\nKey Takeaways\n\n✓ Works only on active income from running a business.\n✗ Does not apply to passive income (rents, dividends, interest, or capital gains).\n✓ Can significantly reduce self-employment tax.\n✓ May unlock larger retirement plan contributions.\n\nBottom line: If you have active business income over $55,000, an S-Corp election can help you keep thousands more each year by reducing self-employment taxes.",
      conditions: [
        {
          questionId: "q1-structure",
          operator: "includes",
          value: ["llc", "partnership"],
          subConditions: [
            {
              questionId: "q1-accountant",
              operator: "equals",
              value: "yes"
            },
            {
              questionId: "q1-revenue",
              operator: "greaterThan",
              value: 55000
            }
          ]
        }
      ]
    },
    {
      id: "result-augusta-rule",
      title: "The Augusta Rule: How It Can Save You Taxes",
      content: "The Augusta Rule (IRS Code §280A(g)) allows you to rent out your personal residence to your business for up to 14 days per year — and the rental income is 100% tax-free to you.\n\nWhy is it called the Augusta Rule?\n\nIt comes from homeowners in Augusta, Georgia, who rented their homes during the Masters Golf Tournament. The IRS created a carve-out: if you rent your home for 14 days or fewer, you don't have to report the rental income on your personal return.\n\nWhen applied to business owners, it can create a legitimate business deduction and personal tax-free income.\n\nHow It Works\n\n1. Your business rents your home for legitimate business purposes — such as meetings, strategy sessions, client events, or team retreats.\n2. Your business pays you fair market rent for use of the space.\n3. The business gets a tax deduction for the rent expense.\n4. You, as the homeowner, do not have to report the rental income (as long as it's 14 days or fewer per year).\n\nSteps to Implement the Augusta Rule\n\n✓ Step 1: Identify legitimate business events\n• Examples: Board meetings, tax planning sessions, team retreats, client appreciation dinners, content/marketing strategy meetings.\n\n✓ Step 2: Determine fair market rental value\n• Check local venues, hotels, or co-working spaces to see what they charge for similar space.\n• Keep documentation of how you arrived at the rental rate.\n\n✓ Step 3: Create documentation\n• Draft a rental agreement between yourself (as homeowner) and your business.\n• Keep meeting agendas, invitations, and minutes as proof the event occurred.\n\n✓ Step 4: Have your business pay you\n• Write a business check to yourself for the rental amount.\n• Deposit it into your personal account.\n\n✓ Step 5: Record properly in your books\n• Deduct as \"Rent Expense\" in your business books.\n• Do not report the rental income on your personal tax return (per IRC §280A(g)).\n\nExample\n\nYour business rents your home for 10 days in a year.\nFair market rate: $500 per day.\nTotal paid: $5,000.\n\n□ Business outcome: $5,000 deduction.\n□ Personal outcome: $5,000 tax-free income.\n\nKey Takeaways\n\n✓ Limited to 14 days per year.\n✓ Must charge fair market rent.\n✓ Must document the business purpose.\n✓ Deduction for the business, tax-free income for you.\n✗ Doesn't work if you skip documentation — keep records!\n\nBottom line: The Augusta Rule (IRC §280A(g)) is one of the simplest ways for business owners to move money from their business to themselves tax-free — when set up and documented correctly.",
      conditions: [
        {
          questionId: "q2-own-home",
          operator: "equals",
          value: "yes",
          subConditions: [
            {
              questionId: "q2-business-meetings",
              operator: "equals",
              value: "yes"
            },
            {
              questionId: "q2-documentation",
              operator: "equals",
              value: "yes"
            }
          ]
        }
      ]
    },
    {
      id: "result-paying-kids",
      title: "Paying Your Children: A Tax-Smart Strategy",
      content: "If you have children and own a business, paying them for legitimate work can create significant tax benefits — for both you and them.\n\nWhy It Works\n\nThe IRS allows you to pay your children a reasonable wage for work they actually perform in your business. If done correctly:\n\n• Your business gets a tax deduction for their wages.\n• Your children may owe little to no income tax (if they earn below the standard deduction).\n• If your business is a sole proprietorship or single-member LLC (and your child is under 18), their wages are not subject to Social Security, Medicare, or FUTA taxes.\n\nKey Rules\n\n✓ The work must be legitimate.\n• Examples: Filing, data entry, social media management, cleaning, inventory, customer service.\n\n✓ The wage must be reasonable.\n• Pay them what you'd pay an unrelated worker for the same job.\n• Document hours worked and tasks completed.\n\n✓ Proper documentation is essential.\n• Keep timesheets, job descriptions, and pay records.\n• Pay them via check or direct deposit (not cash).\n• File a W-2 at year-end.\n\n✓ Age matters.\n• Under 18: Exempt from Social Security, Medicare, and FUTA (if sole prop or partnership with only the parents).\n• 18 and older: Subject to normal payroll taxes.\n\nTax Benefits\n\n1. Business deduction: Reduces your taxable income.\n2. Child's income: May be tax-free if below the standard deduction (~$14,600 for 2025).\n3. Teach financial responsibility: You can help them open a Roth IRA, save for college, or learn budgeting.\n\nExample\n\nYou pay your 15-year-old $10,000 for social media management, filing, and data entry.\n\n□ Your business: $10,000 deduction.\n□ Your child: Likely owes $0 in federal income tax (under the standard deduction).\n□ No payroll taxes (if under 18 and you're a sole prop).\n\nWhat to Avoid\n\n✗ Paying for work they didn't actually do.\n✗ Paying an unreasonably high wage.\n✗ Failing to keep records.\n\nBottom line: Paying your children for real work is a powerful tax strategy that shifts income, reduces your tax burden, and teaches them valuable skills — all while staying fully compliant with IRS rules.",
      conditions: [
        {
          questionId: "q3-has-children",
          operator: "equals",
          value: "yes",
          subConditions: [
            {
              questionId: "q3-legitimate-work",
              operator: "equals",
              value: "yes"
            },
            {
              questionId: "q3-willing-to-document",
              operator: "equals",
              value: "yes"
            }
          ]
        }
      ]
    }
  ],
  thankYou: {
    title: "Your Tax Planning Results",
    introduction: "Thank you for completing the tax planning questionnaire. The information you provided allows us to analyze your current financial and business situation and identify opportunities to reduce your tax liability, maximize deductions, and plan for retirement — all while staying fully compliant with IRS guidelines.",
    benefits: [
      "Highlight specific strategies that may benefit your business and personal finances.",
      "Identify areas where additional documentation or planning may be needed.",
      "Help prioritize high-impact tax-saving opportunities.",
      "Provide a foundation for creating a customized action plan tailored to your goals."
    ],
    goals: [
      "Reducing your taxable income legally and efficiently",
      "Leveraging deductions and credits available to you",
      "Planning for long-term financial growth and retirement"
    ],
    closingStatement: "We are here to answer questions, clarify recommendations, and guide you through the implementation process. Your results are the roadmap — and together, we can help ensure your tax strategies are both effective and fully compliant."
  }
};
