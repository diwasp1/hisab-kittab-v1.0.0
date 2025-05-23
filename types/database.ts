export type Profile = {
  id: string
  full_name: string | null
  avatar_url: string | null
  photo_url?: string | null
  created_at: string
}

export type Contact = {
  id: string
  user_id: string
  name: string
  photo_url?: string | null
  phone: string | null
  email: string | null
  notes: string | null
  created_at: string
}

export type Transaction = {
  id: string
  user_id: string
  contact_id: string
  amount: number
  type: "GAVE" | "TOOK"
  description: string | null
  transaction_date: string
  created_at: string
  contact?: Contact
}

export type TransactionWithContact = Transaction & {
  contact: Contact
}

export type Balance = {
  contact_id: string
  contact_name: string
  gave: number
  took: number
  net: number
}
