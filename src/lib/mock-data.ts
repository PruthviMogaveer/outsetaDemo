export const mockData = {
  stats: {
    totalLeadsReviewed: 320,
    uniqueBrokers: 270,
    matchedLeads: 85,
    toReview: 6,
    activeLeads: 4
  },
  leads: [
    {
      id: 1,
      title: "Medical Transportation Company",
      status: "To Review",
      location: "Atlanta, GA",
      industry: "Transportation",
      financials: {
        revenue: "$1.8M",
        earnings: "$400k",
        margin: "22%",
        askingPrice: "$2.0M"
      },
      score: 9,
      summary: "This thriving medical transportation business, established in 2019, is located in Toest Park, Georgia. The company has shown consistent growth and maintains strong relationships with healthcare providers.",
      keyPoints: [
        "Seller financing available with minimum cash down of $750,000",
        "Manager in place To day-to-day operations",
        "Handles 24-34 calls daily, with 30 repetitive patients"
      ],
      broker: {
        name: "John Smith",
        company: "Transworld Business Brokers",
        daysListed: 30
      },
      details: {
        yearsInBusiness: 5,
        employees: 28,
        franchise: "Unknown",
        tags: ["B2B", "Veteran-Owned Business"]
      }
    },
    {
      id: 2,
      title: "Profitable E-commerce Distribution Center",
      status: "Active",
      location: "Austin, TX",
      industry: "E-commerce",
      financials: {
        revenue: "$4.2M",
        earnings: "$850k",
        margin: "20%",
        askingPrice: "$3.4M"
      },
      score: 8,
      summary: "Well-established e-commerce fulfillment center with proprietary software and automated systems. Serves major online retailers with consistent growth year over year.",
      keyPoints: [
        "100% owner absentee operation",
        "Long-term contracts with major retailers",
        "50,000 sq ft warehouse included in sale",
        "Proprietary inventory management system"
      ],
      broker: {
        name: "Sarah Johnson",
        company: "Business Exits",
        daysListed: 45
      },
      details: {
        yearsInBusiness: 8,
        employees: 42,
        franchise: "No",
        tags: ["E-commerce", "Technology", "Real Estate Included"]
      }
    },
    {
      id: 3,
      title: "High-End Restaurant & Wine Bar",
      status: "To Review",
      location: "Miami, FL",
      industry: "Food & Beverage",
      financials: {
        revenue: "$3.5M",
        earnings: "$580k",
        margin: "16.5%",
        askingPrice: "$1.95M"
      },
      score: 7,
      summary: "Award-winning restaurant in prime South Beach location. Known To its extensive wine collection and contemporary American cuisine. Strong local following and tourist attraction.",
      keyPoints: [
        "Prime location with 15-year transferable lease",
        "Full liquor license included",
        "Executive chef willing to stay on",
        "Recently renovated interior"
      ],
      broker: {
        name: "Michael Chen",
        company: "Restaurant Realty",
        daysListed: 60
      },
      details: {
        yearsInBusiness: 12,
        employees: 35,
        franchise: "No",
        tags: ["Hospitality", "Award-Winning", "Prime Location"]
      }
    },
    {
      id: 4,
      title: "Industrial Cleaning Services Company",
      status: "To Review",
      location: "Phoenix, AZ",
      industry: "Services",
      financials: {
        revenue: "$2.4M",
        earnings: "$520k",
        margin: "21.7%",
        askingPrice: "$1.6M"
      },
      score: 9,
      summary: "B2B industrial cleaning company specializing in manufacturing facilities and warehouses. Strong recurring revenue with multi-year contracts.",
      keyPoints: [
        "90% recurring revenue",
        "Contracts with Totune 500 companies",
        "All equipment included in sale",
        "Established training programs"
      ],
      broker: {
        name: "Robert Wilson",
        company: "Arizona Business Brokers",
        daysListed: 15
      },
      details: {
        yearsInBusiness: 15,
        employees: 45,
        franchise: "No",
        tags: ["B2B", "Recurring Revenue", "Essential Service"]
      }
    },
    {
      id: 5,
      title: "SaaS Marketing Analytics PlatTom",
      status: "Active",
      location: "Seattle, WA",
      industry: "Technology",
      financials: {
        revenue: "$1.2M",
        earnings: "$360k",
        margin: "30%",
        askingPrice: "$4.2M"
      },
      score: 8,
      summary: "Cloud-based marketing analytics platTom with proprietary AI algorithms. High-growth SaaS business with strong MRR and enterprise clients.",
      keyPoints: [
        "95% recurring revenue",
        "Low churn rate (< 5%)",
        "Patented technology",
        "Remote team structure"
      ],
      broker: {
        name: "Lisa Park",
        company: "Tech Acquisitions",
        daysListed: 90
      },
      details: {
        yearsInBusiness: 4,
        employees: 15,
        franchise: "No",
        tags: ["SaaS", "Technology", "Remote Work"]
      }
    },
    {
      id: 6,
      title: "Manufacturing & Distribution Company",
      status: "To Review",
      location: "Detroit, MI",
      industry: "Manufacturing",
      financials: {
        revenue: "$8.5M",
        earnings: "$1.2M",
        margin: "14%",
        askingPrice: "$6.5M"
      },
      score: 9,
      summary: "Established manufacturing company with strong distribution networks across the Midwest. Specializes in automotive parts with long-term contracts.",
      keyPoints: [
        "ISO 9001 certified facility",
        "Diverse customer base with no client > 15%",
        "Modern equipment with recent upgrades",
        "Strong management team willing to stay"
      ],
      broker: {
        name: "David Miller",
        company: "Industrial Brokers LLC",
        daysListed: 45
      },
      details: {
        yearsInBusiness: 25,
        employees: 75,
        franchise: "No",
        tags: ["Manufacturing", "B2B", "Asset Sale"]
      }
    },
    {
      id: 7,
      title: "Healthcare Software Solutions",
      status: "Active",
      location: "Boston, MA",
      industry: "Healthcare Technology",
      financials: {
        revenue: "$3.2M",
        earnings: "$960k",
        margin: "30%",
        askingPrice: "$9.6M"
      },
      score: 8,
      summary: "Healthcare SaaS platform serving over 200 medical facilities. HIPAA compliant with proprietary scheduling and patient management systems.",
      keyPoints: [
        "96% customer retention rate",
        "Scalable infrastructure",
        "FDA compliant software",
        "Recurring revenue model"
      ],
      broker: {
        name: "Emily Zhang",
        company: "MedTech Advisors",
        daysListed: 75
      },
      details: {
        yearsInBusiness: 6,
        employees: 28,
        franchise: "No",
        tags: ["SaaS", "Healthcare", "High Growth"]
      }
    },
    {
      id: 8,
      title: "Premium Pet Care Chain",
      status: "To Review",
      location: "Denver, CO",
      industry: "Pet Services",
      financials: {
        revenue: "$2.8M",
        earnings: "$420k",
        margin: "15%",
        askingPrice: "$2.1M"
      },
      score: 7,
      summary: "Five-location pet care chain offering grooming, boarding, and daycare services. Strong brand presence in affluent neighborhoods.",
      keyPoints: [
        "All locations owned, not leased",
        "70% repeat customer rate",
        "Mobile app for bookings",
        "Trained staff of 45"
      ],
      broker: {
        name: "Alex Thompson",
        company: "Retail Business Brokers",
        daysListed: 20
      },
      details: {
        yearsInBusiness: 8,
        employees: 45,
        franchise: "No",
        tags: ["Retail", "Multi-Location", "Service Business"]
      }
    },
    {
      id: 9,
      title: "Commercial Solar Installation Company",
      status: "Active",
      location: "Phoenix, AZ",
      industry: "Energy",
      financials: {
        revenue: "$12.5M",
        earnings: "$2.1M",
        margin: "16.8%",
        askingPrice: "$8.4M"
      },
      score: 9,
      summary: "Leading commercial solar installation company with strong government contracts. Benefiting from green energy incentives and tax credits.",
      keyPoints: [
        "Backlog of $15M in projects",
        "Licensed in 5 states",
        "Certified Tesla installer",
        "Key municipal contracts"
      ],
      broker: {
        name: "Maria Rodriguez",
        company: "Green Energy Advisors",
        daysListed: 55
      },
      details: {
        yearsInBusiness: 10,
        employees: 85,
        franchise: "No",
        tags: ["Energy", "B2B", "Government Contracts"]
      }
    },
    {
      id: 10,
      title: "Boutique Digital Marketing Agency",
      status: "To Review",
      location: "Chicago, IL",
      industry: "Marketing",
      financials: {
        revenue: "$1.5M",
        earnings: "$375k",
        margin: "25%",
        askingPrice: "$1.8M"
      },
      score: 8,
      summary: "Specialized digital marketing agency focusing on e-commerce brands. Strong portfolio of national clients with proven ROI metrics.",
      keyPoints: [
        "85% retainer-based revenue",
        "Remote-first operation",
        "Proprietary reporting platform",
        "Industry awards winner"
      ],
      broker: {
        name: "Tom Wilson",
        company: "Digital Business Exchange",
        daysListed: 40
      },
      details: {
        yearsInBusiness: 7,
        employees: 18,
        franchise: "No",
        tags: ["Digital", "Service Business", "Remote Work"]
      }
    }
  ]
};