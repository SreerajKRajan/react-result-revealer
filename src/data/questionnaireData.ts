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
          text: "Do you have children under the age of 18?",
          type: "yes-no"
        },
        {
          id: "q3-capable-tasks",
          text: "Are they interested in or capable of helping with business-related tasks (e.g., marketing, admin, social media, cleaning, filing)?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q3-has-children",
            value: "yes"
          }
        },
        {
          id: "q3-paid-through-payroll",
          text: "Have you ever paid your children through payroll for legitimate business services?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q3-capable-tasks",
            value: "yes"
          }
        },
        {
          id: "q3-explore-payroll-strategy",
          text: "Would you like to explore setting up a payroll strategy to shift income and fund tax-advantaged accounts for your kids (e.g., Roth IRA)?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q3-capable-tasks",
            value: "yes"
          }
        }
      ]
    },
    {
      id: "section-4",
      title: "Section 4: Vehicle Purchases & Usage",
      questions: [
        {
          id: "q4-own-lease-vehicle",
          text: "Do you currently own or lease a vehicle that you use for business purposes?",
          type: "yes-no"
        },
        {
          id: "q4-business-percentage",
          text: "Approximately what percentage of the vehicle's use is for business vs. personal?",
          type: "numeric",
          validation: {
            min: 0,
            max: 100
          },
          conditionalOn: {
            questionId: "q4-own-lease-vehicle",
            value: "yes"
          }
        },
        {
          id: "q4-purchased-considering",
          text: "Did you purchase or are you considering purchasing a new or used vehicle this year?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q4-own-lease-vehicle",
            value: "yes"
          }
        },
        {
          id: "q4-vehicle-details",
          text: "If yes, what is the make, model, purchase price, and date of purchase?",
          type: "text",
          conditionalOn: {
            questionId: "q4-purchased-considering",
            value: "yes"
          }
        },
        {
          id: "q4-over-6000lbs",
          text: "Is the vehicle over 6,000 lbs (gross vehicle weight rating), making it eligible for bonus depreciation?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q4-own-lease-vehicle",
            value: "yes"
          }
        },
        {
          id: "q4-review-deductions",
          text: "Would you like to review whether mileage deduction, actual expense deduction, or bonus depreciation provides the biggest tax benefit?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q4-own-lease-vehicle",
            value: "yes"
          }
        }
      ]
    },
    {
      id: "section-5",
      title: "Section 5: Inventory Planning",
      questions: [
        {
          id: "q5-carry-inventory",
          text: "Does your business carry physical inventory?",
          type: "yes-no"
        },
        {
          id: "q5-front-loading",
          text: "Have you considered front-loading inventory purchases before year-end to reduce taxable income?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q5-carry-inventory",
            value: "yes"
          }
        },
        {
          id: "q5-demand-shifts",
          text: "Do you anticipate major shifts in demand that could impact inventory levels next year?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q5-carry-inventory",
            value: "yes"
          }
        }
      ]
    },
    {
      id: "section-6",
      title: "Section 6: Start-Up Costs",
      questions: [
        {
          id: "q6-new-business",
          text: "Did you recently launch or are you planning to launch a new business venture?",
          type: "yes-no"
        },
        {
          id: "q6-incurred-costs",
          text: "Have you incurred costs related to: Business formation/legal fees, Licenses & permits, Marketing/advertising, Website or software development, Equipment or technology for a new line of business?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q6-new-business",
            value: "yes"
          }
        },
        {
          id: "q6-guidance",
          text: "Would you like guidance on how much of your start-up costs can be deducted immediately vs. amortized over time?",
          type: "yes-no",
          conditionalOn: {
            questionId: "q6-incurred-costs",
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
      title: "Paying Your Kids Through Your Business: A Smart Tax Strategy",
      content: "The IRS allows you to pay your children a reasonable wage for real work performed in your business. This shifts income from your higher tax bracket into your child's lower (or zero) tax bracket — while still getting a business deduction.\n\nIRS Reference:\n\n• IRC §162(a) — Allows deductions for \"ordinary and necessary\" business expenses (including wages).\n• IRS Publication 15 (Circular E) — Covers payroll and employment tax rules.\n\nHow It Works\n\n1. Your business pays your child for actual services they perform.\n2. The business gets a deduction for wages paid.\n3. The child pays little to no tax if their income stays under the standard deduction ($14,600 in 2024).\n4. In many cases, no payroll taxes are required if the business is a sole proprietorship or an LLC taxed as a sole proprietorship and the child is under 18.\n\n✓ Step 1: Identify legitimate work\n\nExamples: Social media help, marketing, administrative tasks, cleaning, filing, photography, website updates, stocking inventory.\n\nWork must be age-appropriate and benefit the business.\n\n✓ Step 2: Set a reasonable wage\n\n• Pay your child the going market rate for the work performed.\n• Document hours worked and tasks completed (timesheets or job descriptions).\n\n✓ Step 3: Run payroll correctly\n\nFor Sole Proprietors/LLCs taxed as sole proprietorships:\n\n• Wages to children under 18 are exempt from Social Security, Medicare, and FUTA taxes.\n\nFor S-Corps, Partnerships, or C-Corps:\n\n• Normal payroll tax rules apply, but your strategy still works.\n\n✓ Step 4: Issue a W-2 at year-end\n\n• Just like any employee, your child should get a W-2 showing their wages.\n• File through payroll software or with your accountant.\n\n✓ Step 5: Put their income to work\n\n• Your child can open a Roth IRA with earned income (huge long-term growth opportunity).\n• Or simply save/invest the money for education or future needs.\n\nExample\n\nYou pay your 15-year-old child $12,000 for legitimate work in your business.\n\n• Business outcome: $12,000 deduction (saving ~$3,000+ in taxes if you're in a 25% bracket).\n• Child outcome: Pays $0 in income tax (since income is below the $14,600 standard deduction for 2024).\n• If you're a sole proprietor/LLC, also no payroll tax on those wages.\n\nKey Takeaways\n\n✓ Must be real work with reasonable pay.\n✓ Wages are deductible for the business.\n✓ Children pay little to no income tax.\n✓ Kids under 18 working for sole props/LLCs avoid payroll taxes.\n✓ Great opportunity to fund a Roth IRA or teach financial skills.\n✗ Do not abuse — \"no-show jobs\" or inflated wages won't hold up in an audit.\n\nBottom line: By paying your kids for legitimate work, you turn a family expense into a business deduction while giving your child income that's often tax-free — a win-win strategy backed by IRC §162(a).",
      conditions: [
        {
          questionId: "q3-has-children",
          operator: "equals",
          value: "yes",
          subConditions: [
            {
              questionId: "q3-capable-tasks",
              operator: "equals",
              value: "yes"
            },
            {
              questionId: "q3-explore-payroll-strategy",
              operator: "equals",
              value: "yes"
            }
          ]
        }
      ]
    },
    {
      id: "result-vehicle-deductions",
      title: "Using Vehicles in Your Business: Deduction Strategies",
      content: "Owning or using a vehicle for business can create large deductions — but the strategy depends on your business's profitability.\n\nIRS References:\n\n• IRC §162(a) — Ordinary and necessary business expenses.\n• IRC §167 & §168(k) — Depreciation rules, including bonus depreciation.\n• IRS Publication 463 — Travel, Gift, and Car Expenses.\n\nTwo Main Options for Vehicle Deductions\n\n1. Actual Expense Method (with Depreciation/Bonus Depreciation)\n\n• Deducts expenses like gas, repairs, insurance, and depreciation.\n• Large vehicles (over 6,000 lbs GVWR) can qualify for 100% bonus depreciation (IRC §168(k)) in the year purchased.\n• Important: Your business must show a profit for these deductions to have value. If your business is losing money, depreciation won't reduce your tax bill.\n\n2. Standard Mileage Method\n\n• Deducts a set IRS rate per business mile (67 cents/mile for 2024).\n• Includes all costs of operation in the rate (gas, insurance, repairs).\n• Often better for businesses with lower profits or high-mileage, low-cost vehicles.\n\nSteps to Implement Vehicle Deductions\n\n✓ Step 1: Track Business Use\n\n• Keep a mileage log (apps like MileIQ, QuickBooks, or written logbooks).\n• Document starting mileage Jan 1 and ending mileage Dec 31.\n\n✓ Step 2: Determine Profitability\n\n• If your business is profitable → consider a purchase and use actual expenses/bonus depreciation.\n• If not profitable → stick with mileage tracking.\n\n✓ Step 3: Vehicle Purchase (if profitable)\n\n• Choose a vehicle that fits your business needs (Frequent travelers).\n• If over 6,000 lbs GVWR, you may be able to deduct up to 100% of the cost in year one via bonus depreciation.\n• Deduct loan interest if financed.\n\n✓ Step 4: Maintain Documentation\n\n• Purchase agreement, loan documents, mileage log, and percentage of business vs personal use.\n• If audited, IRS requires proof of business use.\n\nExample: Profitable Business\n\n• Business income: $120,000\n• Purchase 6,500 lb SUV for $70,000 in September.\n• Use 90% for business.\n• Deduction: $63,000 (via bonus depreciation).\n• At 25% tax bracket → $15,750 saved in taxes.\n\nExample: Not Profitable Business\n\n• Business income: $10,000, expenses already $15,000.\n• Buying a $70,000 SUV would create a loss that doesn't help you today.\n• Better move: Track mileage (say 5,000 miles × $0.67 = $3,350 deduction).\n\nKey Takeaways\n\n✓ Must have business profit for vehicle purchase deductions to help.\n✓ Vehicles over 6,000 lbs may qualify for big upfront deductions.\n✓ Mileage method is best for low-profit or high-mileage situations.\n✓ Documentation is critical — track mileage log religiously.\n✗ Don't buy a vehicle \"just for the tax write-off\" — make sure it's an ordinary and necessary business expense (IRC §162).\n\nBottom line: If you're starting a business, don't miss out on deducting up to $10,000 of your pre-opening expenses immediately, with the rest amortized under IRC §195 and §248.",
      conditions: [
        {
          questionId: "q4-own-lease-vehicle",
          operator: "equals",
          value: "yes"
        }
      ]
    },
    {
      id: "result-startup-costs",
      title: "Deducting Start-Up & Organizational Costs",
      content: "When you launch a new business, the IRS allows special treatment for the costs you incur before your business officially opens. These are broken into two categories:\n\n1. Start-Up Costs — Expenses to investigate, create, or prepare your business to begin operations.\n2. Organizational Costs — Costs directly tied to legally setting up your business entity (LLC, corporation, partnership, etc.).\n\nIRS References:\n\n• IRC §195 — Start-up expenditures.\n• IRC §248 — Organizational expenditures.\n• IRS Publication 535 — Business Expenses.\n\nWhat Qualifies?\n\n✓ Start-Up Costs (before the business begins):\n\n• Market research, competitor analysis.\n• Advertising, promotional costs, or travel for pre-opening business activities.\n• Employee training and wages before the business opens.\n• Professional services used in the planning phase.\n\n✓ Organizational Costs (entity formation):\n\n• Legal fees for drafting LLC operating agreement or corporate bylaws.\n• State incorporation/LLC filing fees.\n• Accounting fees for setting up books and records.\n• Expenses of organizational meetings.\n\n✗ Not Included:\n\n• Tangible assets (equipment, vehicles, property → depreciated instead).\n• Inventory purchased for resale (deducted once sold).\n• Costs after the business officially opens (those are operating expenses).\n\nHow the Deduction Works\n\n• You can deduct up to $5,000 of start-up costs AND up to $5,000 of organizational costs in your first year.\n• Any remaining costs must be amortized over 15 years (180 months).\n• The $5,000 immediate deduction begins to phase out once total cost exceed $50,000.\n\nSteps to Implement\n\n✓ Step 1: Track all pre-opening expenses separately from operating costs.\n✓ Step 2: Categorize into start-up vs. organizational.\n✓ Step 3: Deduct up to $10,000 immediately ($5k + $5k).\n✓ Step 4: Amortize the remainder over 15 years.\n\nExample\n\nYou spend $22,000 before officially opening:\n\n• $8,000 market research + advertising (start-up).\n• $6,000 attorney + state filing fees (organizational).\n• $8,000 employee training + pre-opening payroll (start-up).\n\nTotal = $22,000\n\nDeduction:\n\n• $5,000 (start-up) + $5,000 (organizational) = $10,000 immediate deduction.\n• Remaining $12,000 → amortized over 15 years → $800/year.\n\nKey Takeaways\n\n✓ Deduct up to $10,000 immediately for new business costs.\n✓ Spread the rest out over 15 years.\n✓ Careful tracking makes sure you don't miss deductions.\n✗ Assets, inventory, or post-opening costs are not included.\n\nBottom line: If you're starting a business, don't miss out on deducting up to $10,000 of your pre-opening expenses immediately, with the rest amortized under IRC §195 and §248.",
      conditions: [
        {
          questionId: "q6-new-business",
          operator: "equals",
          value: "yes",
          subConditions: [
            {
              questionId: "q6-incurred-costs",
              operator: "equals",
              value: "yes"
            },
            {
              questionId: "q6-guidance",
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
