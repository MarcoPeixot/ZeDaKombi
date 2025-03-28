import { Navbar } from "../components/ui/navbar"
import { Button} from "../components/ui/button"
import { ArrowDownLeft, ArrowUpRight, Download, Filter } from "lucide-react"

export default function TransactionsPage() {
  const transactions = [
    {
      id: 1,
      title: "Article Payment",
      description: "ABC Innovations",
      date: "12/04/2023",
      amount: 2500,
      type: "received",
      status: "confirmed",
    },
    {
      id: 2,
      title: "Research Collaboration",
      description: "Tech Solutions",
      date: "05/04/2023",
      amount: 1800,
      type: "received",
      status: "confirmed",
    },
    {
      id: 3,
      title: "Consulting",
      description: "Green Energy",
      date: "28/03/2023",
      amount: 1200,
      type: "received",
      status: "confirmed",
    },
    {
      id: 4,
      title: "Data Access",
      description: "Research Institute",
      date: "15/03/2023",
      amount: 500,
      type: "sent",
      status: "confirmed",
    },
    {
      id: 5,
      title: "Webinar Payment",
      description: "Invest Capital",
      date: "10/03/2023",
      amount: 800,
      type: "received",
      status: "pending",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">Zcash Transactions</h1>
          <p className="text-secondary">Manage your blockchain payments and receipts</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-secondary mb-1">Total Balance</h3>
            <div className="text-2xl font-bold">ZEC 45.82</div>
            <div className="text-sm text-green-600 mt-1">≈ $ 12,450.00</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-secondary mb-1">Received (30 days)</h3>
            <div className="text-2xl font-bold text-green-600">ZEC 12.50</div>
            <div className="text-sm text-secondary mt-1">5 transactions</div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-secondary mb-1">Sent (30 days)</h3>
            <div className="text-2xl font-bold text-red-500">ZEC 2.30</div>
            <div className="text-sm text-secondary mt-1">2 transactions</div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Transaction History</h2>
            <div className="flex gap-2">
              <Button variant="outline" className="gap-2">
                <Filter className="h-4 w-4" />
                Filter
              </Button>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-secondary">
                  <th className="py-3 px-4">Transaction</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id} className="border-b hover:bg-muted/20">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-8 w-8 rounded-full flex items-center justify-center ${
                            tx.type === "received"
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-500"
                          }`}
                        >
                          {tx.type === "received" ? (
                            <ArrowDownLeft className="h-4 w-4" />
                          ) : (
                            <ArrowUpRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{tx.title}</div>
                          <div className="text-sm text-secondary">{tx.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-secondary">{tx.date}</td>
                    <td className="py-4 px-4 font-medium">
                      <span className={tx.type === "received" ? "text-green-600" : "text-red-500"}>
                        {tx.type === "received" ? "+" : "-"} ZEC {(tx.amount / 1000).toFixed(2)}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded-full ${
                          tx.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {tx.status === "confirmed" ? "Confirmed" : "Pending"}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <Button variant="outline">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-between items-center mt-6 text-sm text-secondary">
            <div>Showing 5 of 24 transactions</div>
            <div className="flex gap-2">
              <Button variant="outline" disabled>
                Previous
              </Button>
              <Button variant="outline">
                Next
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
