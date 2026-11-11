import React, { useState } from 'react';
import {
  Wallet,
  Download,
  FileText,
  DollarSign,
  TrendingDown,
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../components/ui/tabs';

export default function ModernPayroll() {
  const [activeTab, setActiveTab] = useState('payslips');

  const payslips = [
    { id: 1, month: 'October 2026', gross: '$15,000', deductions: '$1,500', net: '$13,500', status: 'Disbursed', date: '2026-10-31' },
    { id: 2, month: 'September 2026', gross: '$15,000', deductions: '$1,500', net: '$13,500', status: 'Disbursed', date: '2026-09-30' },
    { id: 3, month: 'August 2026', gross: '$15,000', deductions: '$1,500', net: '$13,500', status: 'Disbursed', date: '2026-08-31' },
  ];

  const earnings = [
    { component: 'Basic Salary', amount: '$9,000.00' },
    { component: 'House Rent Allowance (HRA)', amount: '$3,600.00' },
    { component: 'Special Executive Allowance', amount: '$2,400.00' },
  ];

  const deductions = [
    { component: 'Provident Fund (Employee PF)', amount: '$900.00' },
    { component: 'Income Tax (TDS Deduction)', amount: '$550.00' },
    { component: 'Professional Tax', amount: '$50.00' },
  ];

  const taxDeclarations = [
    { id: 1, section: 'Section 80C', item: 'Employee PF & ELSS Equity', limit: '$150,000', declared: '$150,000', status: 'Verified' },
    { id: 2, section: 'Section 80D', item: 'Medical & Health Insurance Policy', limit: '$25,000', declared: '$25,000', status: 'Verified' },
    { id: 3, section: 'Section 24(b)', item: 'Housing Loan Interest Deduction', limit: '$200,000', declared: '$120,000', status: 'Pending Review' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-200">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Payroll & Tax Portal
          </h1>
          <p className="text-sm text-muted-foreground">
            Access itemized salary slips, tax regime configurations, and reimbursement filings.
          </p>
        </div>
        <Button className="gap-2 bg-primary text-primary-foreground font-semibold">
          <Download className="w-4 h-4" />
          <span>Download Latest Payslip (PDF)</span>
        </Button>
      </div>

      {/* 3 Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="border-l-4 border-primary">
          <div className="p-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase">October Net Payout</span>
            <div className="text-3xl font-bold text-foreground mt-1">$13,500.00</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <CheckCircle className="w-3.5 h-3.5 text-primary" />
              <span>Transferred to Chase Account •••• 4892</span>
            </p>
          </div>
        </Card>

        <Card className="border-l-4 border-[#21093D] dark:border-purple-400">
          <div className="p-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase">Annual CTC Package</span>
            <div className="text-3xl font-bold text-foreground mt-1">$180,000.00</div>
            <p className="text-xs text-muted-foreground mt-1">Tier: Senior Leadership Structure</p>
          </div>
        </Card>

        <Card className="border-l-4 border-emerald-500">
          <div className="p-4">
            <span className="text-xs font-semibold text-muted-foreground uppercase">TDS Withheld (YTD)</span>
            <div className="text-3xl font-bold text-foreground mt-1">$5,500.00</div>
            <p className="text-xs text-emerald-600 mt-1 font-medium">100% Tax Compliant</p>
          </div>
        </Card>
      </div>

      {/* Tabbed interface for Payslip Breakdown vs History vs Tax */}
      <Tabs defaultValue="payslips" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="payslips">Latest Salary Breakdown</TabsTrigger>
          <TabsTrigger value="history">Historical Payslips</TabsTrigger>
          <TabsTrigger value="tax">Tax Declarations (FY 2026-27)</TabsTrigger>
        </TabsList>

        <TabsContent value="payslips">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Earnings Card */}
            <Card>
              <CardHeader className="bg-accent/40 pb-3 border-b border-border">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  Monthly Earnings
                </CardTitle>
                <CardDescription>Fixed & Variable Allowance Components</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {earnings.map((e, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-medium">{e.component}</TableCell>
                        <TableCell className="text-right text-xs font-bold text-foreground">
                          {e.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-secondary/40 font-bold border-t-2 border-border">
                      <TableCell className="text-xs">Gross Earnings</TableCell>
                      <TableCell className="text-right text-xs text-primary-foreground font-black">
                        $15,000.00
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Deductions Card */}
            <Card>
              <CardHeader className="bg-secondary/60 pb-3 border-b border-border">
                <CardTitle className="text-sm font-semibold flex items-center gap-2 text-foreground">
                  <TrendingDown className="w-4 h-4 text-destructive" />
                  Monthly Deductions
                </CardTitle>
                <CardDescription>Mandatory Statutory & Tax Deductions</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableBody>
                    {deductions.map((d, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-xs font-medium">{d.component}</TableCell>
                        <TableCell className="text-right text-xs font-bold text-destructive">
                          {d.amount}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="bg-secondary/40 font-bold border-t-2 border-border">
                      <TableCell className="text-xs">Total Deductions</TableCell>
                      <TableCell className="text-right text-xs text-destructive font-black">
                        $1,500.00
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Salary Slips Archive</CardTitle>
              <CardDescription>Download official signed PDF salary statements</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pay Period</TableHead>
                  <TableHead>Gross</TableHead>
                  <TableHead>Deductions</TableHead>
                  <TableHead>Net Pay</TableHead>
                  <TableHead>Disbursement Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payslips.map((ps) => (
                  <TableRow key={ps.id}>
                    <TableCell className="font-semibold text-foreground">{ps.month}</TableCell>
                    <TableCell className="text-xs">{ps.gross}</TableCell>
                    <TableCell className="text-xs text-destructive">{ps.deductions}</TableCell>
                    <TableCell className="text-xs font-bold text-foreground">{ps.net}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{ps.date}</TableCell>
                    <TableCell>
                      <Badge variant="success">● {ps.status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm" className="h-7 text-xs gap-1">
                        <Download className="w-3.5 h-3.5" />
                        PDF
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="tax">
          <Card>
            <CardHeader>
              <CardTitle className="text-base font-semibold">Income Tax Declarations (80C, 80D, 24b)</CardTitle>
              <CardDescription>Filing status and verification audit logs</CardDescription>
            </CardHeader>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Section</TableHead>
                  <TableHead>Investment Category</TableHead>
                  <TableHead>Annual Cap</TableHead>
                  <TableHead>Declared Amount</TableHead>
                  <TableHead>Verification Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {taxDeclarations.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-semibold text-foreground">{tx.section}</TableCell>
                    <TableCell className="text-xs font-medium">{tx.item}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">{tx.limit}</TableCell>
                    <TableCell className="text-xs font-bold text-foreground">{tx.declared}</TableCell>
                    <TableCell>
                      <Badge variant={tx.status === 'Verified' ? 'success' : 'warning'}>
                        {tx.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
