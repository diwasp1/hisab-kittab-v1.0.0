import type { Contact, Transaction, Balance, Profile } from "@/types/database"

// Demo user profile
export const demoProfile: Profile = {
  id: "demo-user-id",
  full_name: "Demo User",
  avatar_url: null,
  created_at: new Date().toISOString(),
}

// Demo contacts
export const demoContacts: Contact[] = [
  {
    id: "contact-1",
    user_id: "demo-user-id",
    name: "Rahul Sharma",
    phone: "9876543210",
    email: "rahul@example.com",
    notes: "Friend",
    created_at: new Date().toISOString(),
  },
  {
    id: "contact-2",
    user_id: "demo-user-id",
    name: "Priya Patel",
    phone: "8765432109",
    email: "priya@example.com",
    notes: "Colleague",
    created_at: new Date().toISOString(),
  },
  {
    id: "contact-3",
    user_id: "demo-user-id",
    name: "Amit Singh",
    phone: "7654321098",
    email: "amit@example.com",
    notes: "Neighbor",
    created_at: new Date().toISOString(),
  },
]

// Demo transactions
export const demoTransactions: Transaction[] = [
  {
    id: "transaction-1",
    user_id: "demo-user-id",
    contact_id: "contact-1",
    amount: 500,
    type: "GAVE",
    description: "Lunch money",
    transaction_date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "transaction-2",
    user_id: "demo-user-id",
    contact_id: "contact-2",
    amount: 1000,
    type: "GAVE",
    description: "Movie tickets",
    transaction_date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "transaction-3",
    user_id: "demo-user-id",
    contact_id: "contact-3",
    amount: 2000,
    type: "TOOK",
    description: "Borrowed for shopping",
    transaction_date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "transaction-4",
    user_id: "demo-user-id",
    contact_id: "contact-1",
    amount: 300,
    type: "TOOK",
    description: "Coffee",
    transaction_date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
  {
    id: "transaction-5",
    user_id: "demo-user-id",
    contact_id: "contact-2",
    amount: 1500,
    type: "GAVE",
    description: "Dinner",
    transaction_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    created_at: new Date().toISOString(),
  },
]

// Calculate demo balances
export function calculateDemoBalances(): Balance[] {
  const balances: Record<string, Balance> = {}

  // Initialize balances for all contacts
  demoContacts.forEach((contact) => {
    balances[contact.id] = {
      contact_id: contact.id,
      contact_name: contact.name,
      gave: 0,
      took: 0,
      net: 0,
    }
  })

  // Calculate balances from transactions
  demoTransactions.forEach((transaction) => {
    if (balances[transaction.contact_id]) {
      if (transaction.type === "GAVE") {
        balances[transaction.contact_id].gave += transaction.amount
      } else {
        balances[transaction.contact_id].took += transaction.amount
      }
      balances[transaction.contact_id].net =
        balances[transaction.contact_id].gave - balances[transaction.contact_id].took
    }
  })

  return Object.values(balances)
}

// Demo transactions with contact info
export function getDemoTransactionsWithContacts(): (Transaction & { contact: Contact })[] {
  return demoTransactions.map((transaction) => {
    const contact = demoContacts.find((c) => c.id === transaction.contact_id)

    // Handle case where contact might be missing
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
      }
    }

    return {
      ...transaction,
      contact,
    }
  })
}
