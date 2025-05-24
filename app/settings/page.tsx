"use client"

import { useState } from "react"
import { MobileNav } from "@/components/mobile-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Globe, Shield, Download, Upload, Trash2, HelpCircle, AlertTriangle, ExternalLink } from "lucide-react"
import { useDemoMode, CURRENCIES, type Currency, type Language } from "@/contexts/demo-context"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import { PageHeader } from "@/components/page-header"

export default function SettingsPage() {
  const { settings, setCurrency, setLanguage, setNotifications, setDarkMode, exportData, importData, clearAllData } =
    useDemoMode()

  const [isExporting, setIsExporting] = useState(false)
  const [isImporting, setIsImporting] = useState(false)
  const [isClearing, setIsClearing] = useState(false)
  const [importDialogOpen, setImportDialogOpen] = useState(false)
  const [clearDialogOpen, setClearDialogOpen] = useState(false)
  const [importData1, setImportData1] = useState("")

  function handleCurrencyChange(value: string) {
    setCurrency(value as Currency)
  }

  function handleLanguageChange(value: string) {
    setLanguage(value as Language)
  }

  async function handleExportData() {
    setIsExporting(true)
    try {
      const data = await exportData()

      // Create a blob and download it
      const blob = new Blob([data], { type: "application/json" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `hisab-kittab-export-${new Date().toISOString().split("T")[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Export Failed", error)
    } finally {
      setIsExporting(false)
    }
  }

  async function handleImportData() {
    setIsImporting(true)
    try {
      const success = await importData(importData1)
      if (success) {
        setImportDialogOpen(false)
      } else {
        throw new Error("Import failed")
      }
    } catch (error) {
      console.error("Import Failed", error)
    } finally {
      setIsImporting(false)
    }
  }

  async function handleClearData() {
    setIsClearing(true)
    try {
      const success = await clearAllData()
      if (success) {
        setClearDialogOpen(false)
      } else {
        throw new Error("Clear failed")
      }
    } catch (error) {
      console.error("Clear Failed", error)
    } finally {
      setIsClearing(false)
    }
  }

  function openExternalLink(url: string) {
    // In a real app, this would open an external link
    console.log(`This would open: ${url}`)
  }

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 pb-16">
      {/* Header */}
      <PageHeader title="Settings" showBackButton={true} />

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        {/* Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Push Notifications</Label>
                <p className="text-sm text-muted-foreground">Receive notifications for new transactions</p>
              </div>
              <Switch
                id="notifications"
                checked={settings.notifications}
                onCheckedChange={(checked) => {
                  setNotifications(checked)
                }}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="darkMode">Dark Mode</Label>
                <p className="text-sm text-muted-foreground">Switch to dark theme</p>
              </div>
              <Switch
                id="darkMode"
                checked={settings.darkMode}
                onCheckedChange={(checked) => {
                  setDarkMode(checked)
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Localization */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Localization
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency.code} onValueChange={handleCurrencyChange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AUD">Australian Dollar ({CURRENCIES.AUD.symbol})</SelectItem>
                  <SelectItem value="INR">Indian Rupee ({CURRENCIES.INR.symbol})</SelectItem>
                  <SelectItem value="USD">US Dollar ({CURRENCIES.USD.symbol})</SelectItem>
                  <SelectItem value="EUR">Euro ({CURRENCIES.EUR.symbol})</SelectItem>
                  <SelectItem value="GBP">British Pound ({CURRENCIES.GBP.symbol})</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="language">Language</Label>
              <Select value={settings.language} onValueChange={handleLanguageChange}>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Select language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="hi">Hindi</SelectItem>
                  <SelectItem value="es">Spanish</SelectItem>
                  <SelectItem value="fr">French</SelectItem>
                  <SelectItem value="de">German</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Data Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Data Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={handleExportData}
              disabled={isExporting}
            >
              <Download className="h-4 w-4 mr-2" />
              {isExporting ? "Exporting..." : "Export Data"}
            </Button>

            <Dialog open={importDialogOpen} onOpenChange={setImportDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full justify-start h-12">
                  <Upload className="h-4 w-4 mr-2" />
                  Import Data
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Import Data</DialogTitle>
                  <DialogDescription>
                    Paste your exported JSON data below. This will replace your current data.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <Textarea
                    placeholder="Paste your JSON data here..."
                    className="min-h-[200px]"
                    value={importData1}
                    onChange={(e) => setImportData1(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setImportDialogOpen(false)} disabled={isImporting}>
                    Cancel
                  </Button>
                  <Button onClick={handleImportData} disabled={isImporting || !importData1.trim()}>
                    {isImporting ? "Importing..." : "Import"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={clearDialogOpen} onOpenChange={setClearDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" className="w-full justify-start h-12">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Clear All Data
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="flex items-center">
                    <AlertTriangle className="h-5 w-5 text-destructive mr-2" />
                    Clear All Data
                  </DialogTitle>
                  <DialogDescription>
                    This action cannot be undone. This will permanently delete all your contacts and transactions.
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-sm text-muted-foreground">
                    Are you sure you want to clear all your data? You might want to export your data first.
                  </p>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setClearDialogOpen(false)} disabled={isClearing}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleClearData} disabled={isClearing}>
                    {isClearing ? "Clearing..." : "Yes, Clear All Data"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>

        {/* Help & Support */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2" />
              Help & Support
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => openExternalLink("https://hisabkittab.com/help")}
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Help Center
              <ExternalLink className="h-3 w-3 ml-2 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => openExternalLink("https://hisabkittab.com/support")}
            >
              Contact Support
              <ExternalLink className="h-3 w-3 ml-2 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => openExternalLink("https://hisabkittab.com/privacy")}
            >
              Privacy Policy
              <ExternalLink className="h-3 w-3 ml-2 text-muted-foreground" />
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-12"
              onClick={() => openExternalLink("https://hisabkittab.com/terms")}
            >
              Terms of Service
              <ExternalLink className="h-3 w-3 ml-2 text-muted-foreground" />
            </Button>
          </CardContent>
        </Card>

        {/* App Info */}
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-center py-4">
              <p className="text-sm text-muted-foreground">Hisab Kittab v1.0.0</p>
              <p className="text-xs text-muted-foreground">Demo Version</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <MobileNav />
    </div>
  )
}
