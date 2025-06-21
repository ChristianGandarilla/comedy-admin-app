
'use client';

import React, { useState } from 'react';
import PageHeader from '@/components/page-header';
import { transactions as initialTransactions } from '@/lib/data';
import { columns } from '@/components/finances/columns';
import { DataTable } from '@/components/shows/data-table';
import FinancesStats from '@/components/finances/finances-stats';
import TransactionForm from '@/components/finances/transaction-form';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import type { Transaction } from '@/lib/types';

// This is the type of data the form will produce
type TransactionFormData = Omit<Transaction, 'id'>;

export default function FinancesPage() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | undefined>(undefined);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [transactionToDelete, setTransactionToDelete] = useState<string | null>(null);

  const handleAdd = () => {
    setEditingTransaction(undefined);
    setIsFormOpen(true);
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    setTransactionToDelete(id);
    setIsAlertOpen(true);
  };

  const confirmDelete = () => {
    if (transactionToDelete) {
      setTransactions(transactions.filter((t) => t.id !== transactionToDelete));
      setTransactionToDelete(null);
    }
    setIsAlertOpen(false);
  };

  const handleFormSubmit = (data: TransactionFormData) => {
    if (editingTransaction) {
      setTransactions(
        transactions.map((t) =>
          t.id === editingTransaction.id ? { ...t, ...data } : t
        )
      );
    } else {
      const newTransaction: Transaction = {
        ...data,
        id: `txn-${Date.now()}`,
      };
      setTransactions([newTransaction, ...transactions]);
    }
    setIsFormOpen(false);
    setEditingTransaction(undefined);
  };

  return (
    <div className="flex flex-col gap-8">
      <PageHeader
        title="Finances"
        description="Track your income, expenses, and profitability."
        buttonText="Add Transaction"
        onButtonClick={handleAdd}
      />

      <TransactionForm
        isOpen={isFormOpen}
        onOpenChange={setIsFormOpen}
        onSubmit={handleFormSubmit}
        transaction={editingTransaction}
      />
      
      <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this transaction.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <FinancesStats />
      <DataTable
        columns={columns}
        data={transactions}
        filterColumn="description"
        filterPlaceholder="Filter by description..."
        meta={{
          handleEdit,
          handleDelete,
        }}
      />
    </div>
  );
}
