"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import {
  demoContacts,
  demoProfile,
  demoTransactions,
  calculateDemoBalances,
  getDemoTransactionsWithContacts,
} from "@/utils/demo-data"
import type { Contact, Transaction, Balance, Profile, TransactionWithContact } from "@/types/database"

export type Currency = "AUD" | "INR" | "USD" | "EUR" | "GBP"
export type Language = "en" | "hi" | "es" | "fr" | "de"

export type CurrencyInfo = {
  code: Currency
  symbol: string
  name: string
}

export const CURRENCIES: Record<Currency, CurrencyInfo> = {
  AUD: { code: "AUD", symbol: "$", name: "Australian Dollar" },
  INR: { code: "INR", symbol: "₹", name: "Indian Rupee" },
  USD: { code: "USD", symbol: "$", name: "US Dollar" },
  EUR: { code: "EUR", symbol: "€", name: "Euro" },
  GBP: { code: "GBP", symbol: "£", name: "British Pound" },
}

export const LANGUAGES: Record<Language, string> = {
  en: "English",
  hi: "Hindi",
  es: "Spanish",
  fr: "French",
  de: "German",
}

type AppSettings = {
  notifications: boolean
  darkMode: boolean
  language: Language
  currency: CurrencyInfo
}

type DemoContextType = {
  isDemoMode: boolean
  setDemoMode: (value: boolean) => void
  profile: Profile | null
  contacts: Contact[]
  transactions: Transaction[]
  transactionsWithContacts: TransactionWithContact[]
  balances: Balance[]
  settings: AppSettings
  updateSettings: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void
  setCurrency: (currency: Currency) => void
  setLanguage: (language: Language) => void
  setNotifications: (enabled: boolean) => void
  setDarkMode: (enabled: boolean) => void
  formatAmount: (amount: number) => string
  addContact: (contact: Omit<Contact, "id" | "user_id" | "created_at">) => void
  deleteContact: (id: string) => void
  addTransaction: (transaction: Omit<Transaction, "id" | "user_id" | "created_at">) => void
  deleteTransaction: (id: string) => void
  exportData: () => Promise<string>
  importData: (data: string) => Promise<boolean>
  clearAllData: () => Promise<boolean>
}

const DemoContext = createContext<DemoContextType | undefined>(undefined)

export function DemoProvider({ children }: { children: ReactNode }) {
  // Always start in demo mode
  const [isDemoMode, setIsDemoMode] = useState(true)
  const [profile, setProfile] = useState<Profile | null>(demoProfile)
  const [contacts, setContacts] = useState<Contact[]>(demoContacts)
  const [transactions, setTransactions] = useState<Transaction[]>(demoTransactions)
  const [balances, setBalances] = useState<Balance[]>(calculateDemoBalances())
  const [transactionsWithContacts, setTransactionsWithContacts] = useState<TransactionWithContact[]>(
    getDemoTransactionsWithContacts(),
  )

  // App settings with defaults
  const [settings, setSettings] = useState<AppSettings>({
    notifications: false,
    darkMode: false,
    language: "en" as Language,
    currency: CURRENCIES.AUD,
  })

  // Load settings from localStorage on initial load
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedSettings = localStorage.getItem("hisabKittabSettings")
        if (savedSettings) {
          const parsedSettings = JSON.parse(savedSettings) as Partial<AppSettings>

          // Merge saved settings with defaults
          setSettings((prev) => ({
            ...prev,
            ...parsedSettings,
            // Handle currency object separately
            currency: parsedSettings.currency ? CURRENCIES[parsedSettings.currency.code as Currency] : prev.currency,
          }))
        }
      } catch (error) {
        console.error("Error loading settings:", error)
      }
    }
  }, [])

  // Save settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("hisabKittabSettings", JSON.stringify(settings))
    }
  }, [settings])

  // Update a specific setting
  const updateSettings = <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  // Format amount with currency symbol
  const formatAmount = (amount: number): string => {
    return `${settings.currency.symbol}${Math.abs(amount).toFixed(2)}`
  }

  // Set currency
  const setCurrency = (currencyCode: Currency) => {
    updateSettings("currency", CURRENCIES[currencyCode])
  }

  // Set language
  const setLanguage = (language: Language) => {
    updateSettings("language", language)
  }

  // Set notifications
  const setNotifications = (enabled: boolean) => {
    updateSettings("notifications", enabled)
  }

  // Set dark mode
  const setDarkMode = (enabled: boolean) => {
    updateSettings("darkMode", enabled)
  }

  // Add a new contact
  const addContact = (contactData: Omit<Contact, "id" | "user_id" | "created_at">) => {
    const newContact: Contact = {
      id: `contact-${Date.now()}`,
      user_id: "demo-user-id",
      created_at: new Date().toISOString(),
      ...contactData,
    }

    setContacts((prev) => [...prev, newContact])
  }

  // Delete a contact
  const deleteContact = (id: string) => {
    setContacts((prev) => prev.filter((contact) => contact.id !== id))
    setTransactions((prev) => prev.filter((transaction) => transaction.contact_id !== id))
  }

  // Add a new transaction
  const addTransaction = (transactionData: Omit<Transaction, "id" | "user_id" | "created_at">) => {
    const newTransaction: Transaction = {
      id: `transaction-${Date.now()}`,
      user_id: "demo-user-id",
      created_at: new Date().toISOString(),
      ...transactionData,
    }

    setTransactions((prev) =>
      [...prev, newTransaction].sort(
        (a, b) => new Date(b.transaction_date).getTime() - new Date(a.transaction_date).getTime(),
      ),
    )
  }

  // Delete a transaction
  const deleteTransaction = (id: string) => {
    setTransactions((prev) => prev.filter((transaction) => transaction.id !== id))
  }

  // Export all data as JSON
  const exportData = async (): Promise<string> => {
    const data = {
      profile,
      contacts,
      transactions,
      settings,
    }
    return JSON.stringify(data, null, 2)
  }

  // Import data from JSON
  const importData = async (data: string): Promise<boolean> => {
    try {
      const parsedData = JSON.parse(data)

      if (parsedData.profile) setProfile(parsedData.profile)
      if (parsedData.contacts) setContacts(parsedData.contacts)
      if (parsedData.transactions) setTransactions(parsedData.transactions)
      if (parsedData.settings) {
        setSettings((prev) => ({
          ...prev,
          ...parsedData.settings,
          // Handle currency object separately
          currency: parsedData.settings.currency
            ? CURRENCIES[parsedData.settings.currency.code as Currency]
            : prev.currency,
        }))
      }

      return true
    } catch (error) {
      console.error("Error importing data:", error)
      return false
    }
  }

  // Clear all data
  const clearAllData = async (): Promise<boolean> => {
    try {
      // Reset to initial demo data
      setProfile(demoProfile)
      setContacts([])
      setTransactions([])

      return true
    } catch (error) {
      console.error("Error clearing data:", error)
      return false
    }
  }

  // Update derived state (balances and transactions with contacts)
  useEffect(() => {
    // Calculate balances
    const newBalances: Record<string, Balance> = {}

    // Initialize balances for all contacts
    contacts.forEach((contact) => {
      newBalances[contact.id] = {
        contact_id: contact.id,
        contact_name: contact.name,
        gave: 0,
        took: 0,
        net: 0,
      }
    })

    // Calculate balances from transactions
    transactions.forEach((transaction) => {
      if (newBalances[transaction.contact_id]) {
        if (transaction.type === "GAVE") {
          newBalances[transaction.contact_id].gave += transaction.amount
        } else {
          newBalances[transaction.contact_id].took += transaction.amount
        }
        newBalances[transaction.contact_id].net =
          newBalances[transaction.contact_id].gave - newBalances[transaction.contact_id].took
      }
    })

    setBalances(Object.values(newBalances))

    // Update transactions with contacts
    const newTransactionsWithContacts = transactions.map((transaction) => {
      const contact = contacts.find((c) => c.id === transaction.contact_id)

      if (!contact) {
        return {
          ...transaction,
          contact: {
            id: transaction.contact_id,
            user_id: "demo-user-id",
            name: "Unknown Contact",
            phone: null,
            email: null,
            notes: null,
            created_at: new Date().toISOString(),
          },
        } as TransactionWithContact
      }

      return {
        ...transaction,
        contact,
      }
    })

    setTransactionsWithContacts(newTransactionsWithContacts)
  }, [contacts, transactions])

  // Demo mode is always enabled for now
  const setDemoMode = (value: boolean) => {
    // Always keep demo mode enabled
    setIsDemoMode(true)

    // Set cookie for demo mode
    if (typeof window !== "undefined") {
      document.cookie = "hisabKittabDemoMode=true; path=/; max-age=86400"
    }
  }

  return (
    <DemoContext.Provider
      value={{
        isDemoMode,
        setDemoMode,
        profile,
        contacts,
        transactions,
        transactionsWithContacts,
        balances,
        settings,
        updateSettings,
        setCurrency,
        setLanguage,
        setNotifications,
        setDarkMode,
        formatAmount,
        addContact,
        deleteContact,
        addTransaction,
        deleteTransaction,
        exportData,
        importData,
        clearAllData,
      }}
    >
      {children}
    </DemoContext.Provider>
  )
}

export function useDemoMode() {
  const context = useContext(DemoContext)
  if (context === undefined) {
    throw new Error("useDemoMode must be used within a DemoProvider")
  }
  return context
}
