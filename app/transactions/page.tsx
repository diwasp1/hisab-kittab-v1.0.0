"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { format } from "date-fns"
import { ArrowDown, ArrowUp, Search, Filter, X, Calendar } from "lucide-react"
import { useDemoMode } from "@/contexts/demo-context"
import { PageHeader } from "@/components/page-header"
import { cn } from "@/lib/utils"

export default function TransactionsPage() {
  const { transactionsWithContacts, formatAmount } = useDemoMode()
  const [searchQuery, setSearchQuery] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [showFilters, setShowFilters] = useState(false)

  // Filter and sort transactions
  const filteredAndSortedTransactions = transactionsWithContacts
    .filter((transaction) => {
      // Search filter
      const matchesSearch =
        transaction.contact?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.description?.toLowerCase().includes(searchQuery.toLowerCase())

      // Type filter
      const matchesType =
        filterType === "all" ||
        (filterType === "gave" && transaction.type === "GAVE") ||
        (filterType === "took" && transaction.type === "TOOK")

      return matchesSearch && matchesType
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "date":
          return new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime()
        case "amount":
          return b.amount - a.amount
        case "name":
          return (a.contact?.name || "").localeCompare(b.contact?.name || "")
        default:
          return 0
      }
    })

  const clearFilters = () => {
    setSearchQuery("")
    setFilterType("all")
    setSortBy("date")
  }

  const hasActiveFilters = searchQuery !== "" || filterType !== "all" || sortBy !== "date"

  // Custom header actions with search and filter
  const headerActions = (
    <div className="flex space-x-2">
      <Button variant="ghost" size="icon" className="h-10 w-10" onClick={() => setShowFilters(!showFilters)}>
        <Filter className={cn("h-5 w-5", showFilters && "text-primary")} />
      </Button>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header */}
      <PageHeader title="Transactions" customActions={headerActions} />

      {/* Search and Filters */}
      <div className="px-3 sm:px-4 py-3 sm:py-4 space-y-3">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10 h-12 bg-white"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1 h-10 w-10"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <Card className="border-none shadow-md">
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Filters</h3>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters} className="text-primary">
                    Clear all
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Transaction Type Filter */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Transaction Type</label>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="All types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="gave">Money Given</SelectItem>
                      <SelectItem value="took">Money Received</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort By */}
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="h-10">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Date (Newest First)</SelectItem>
                      <SelectItem value="amount">Amount (Highest First)</SelectItem>
                      <SelectItem value="name">Contact Name (A-Z)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2">
            {searchQuery && (
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Search: "{searchQuery}"</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-primary/20"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {filterType !== "all" && (
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Type: {filterType === "gave" ? "Money Given" : "Money Received"}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-primary/20"
                  onClick={() => setFilterType("all")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
            {sortBy !== "date" && (
              <div className="flex items-center bg-primary/10 text-primary px-3 py-1 rounded-full text-sm">
                <span>Sort: {sortBy === "amount" ? "Amount" : "Name"}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-5 w-5 ml-1 hover:bg-primary/20"
                  onClick={() => setSortBy("date")}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Results Summary */}
      {(searchQuery || filterType !== "all") && (
        <div className="px-3 sm:px-4 pb-2">
          <p className="text-sm text-muted-foreground">
            Showing {filteredAndSortedTransactions.length} of {transactionsWithContacts.length} transactions
          </p>
        </div>
      )}

      {/* Transactions List */}
      <div className="px-3 sm:px-4 pb-4">
        <Card className="border-none shadow-md">
          <CardContent className="p-0 divide-y">
            {filteredAndSortedTransactions.length === 0 ? (
              <div className="p-6 text-center">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  {searchQuery || filterType !== "all" ? (
                    <Search className="h-6 w-6 text-gray-400" />
                  ) : (
                    <Calendar className="h-6 w-6 text-gray-400" />
                  )}
                </div>
                <h3 className="font-medium text-gray-900 mb-1">
                  {searchQuery || filterType !== "all" ? "No transactions found" : "No transactions yet"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchQuery || filterType !== "all"
                    ? "Try adjusting your search or filters"
                    : "Start adding transactions to see them here"}
                </p>
                {hasActiveFilters && (
                  <Button variant="outline" size="sm" className="mt-3" onClick={clearFilters}>
                    Clear filters
                  </Button>
                )}
              </div>
            ) : (
              filteredAndSortedTransactions.map((transaction) => (
                <div key={transaction.id} className="p-3 sm:p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center min-w-0 flex-1">
                      <div
                        className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${
                          transaction.type === "GAVE" ? "bg-green-100" : "bg-red-100"
                        }`}
                      >
                        {transaction.type === "GAVE" ? (
                          <ArrowUp className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
                        ) : (
                          <ArrowDown className="h-5 w-5 sm:h-6 sm:w-6 text-red-500" />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-sm sm:text-base truncate">{transaction.contact?.name}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(transaction.transaction_date), "MMM d, yyyy")}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <div
                        className={`font-semibold text-sm sm:text-base ${
                          transaction.type === "GAVE" ? "text-green-500" : "text-red-500"
                        }`}
                      >
                        {transaction.type === "GAVE" ? "+" : "-"}
                        {formatAmount(transaction.amount)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {transaction.type === "GAVE" ? "Given" : "Received"}
                      </p>
                    </div>
                  </div>
                  {transaction.description && (
                    <p className="text-sm text-muted-foreground mt-2 ml-13 sm:ml-15 truncate">
                      {transaction.description}
                    </p>
                  )}
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
