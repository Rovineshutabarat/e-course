"use client";

import {
  Building2,
  CheckCircle2,
  CreditCard,
  Mail,
  Plus,
  Trash2,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type PayoutMethod = {
  id: number;
  type: "Bank Transfer" | "PayPal";
  label: string;
  detail: string;
  isPrimary: boolean;
};

const initialMethods: PayoutMethod[] = [
  {
    id: 1,
    type: "Bank Transfer",
    label: "BCA",
    detail: "**4521",
    isPrimary: true,
  },
  {
    id: 2,
    type: "PayPal",
    label: "PayPal",
    detail: "john@mail.com",
    isPrimary: false,
  },
];

const methodIcon = {
  "Bank Transfer": Building2,
  PayPal: CreditCard,
};

const PayoutSettingsPage = () => {
  const [methods, setMethods] = useState<PayoutMethod[]>(initialMethods);
  const [primaryId, setPrimaryId] = useState<number>(1);
  const [open, setOpen] = useState(false);

  const [notifSuccess, setNotifSuccess] = useState(true);
  const [notifFailed, setNotifFailed] = useState(true);
  const [notifPending, setNotifPending] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);

  const setPrimary = (id: number) => {
    setPrimaryId(id);
    setMethods((prev) => prev.map((m) => ({ ...m, isPrimary: m.id === id })));
  };

  const removeMethod = (id: number) => {
    if (id === primaryId) return;
    setMethods((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Payout Settings</h2>
        <p className="text-sm mt-1 text-muted-foreground">
          Manage your payout methods and notification preferences.
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Payout Methods</CardTitle>
            <CardDescription className="mt-1.5">
              Add and manage accounts where your earnings will be sent. The
              primary method is used for automatic payouts.
            </CardDescription>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Method
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <DialogHeader>
                <DialogTitle>Add Payout Method</DialogTitle>
                <DialogDescription>
                  Choose a method and fill in your account details.
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="bank" className="w-full">
                <TabsList className="w-full">
                  <TabsTrigger value="bank" className="flex-1">
                    Bank Transfer
                  </TabsTrigger>
                  <TabsTrigger value="paypal" className="flex-1">
                    PayPal
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="bank" className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-1.5">
                    <Label>Bank Name</Label>
                    <Input placeholder="e.g. BCA, Mandiri, BNI" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Account Number</Label>
                    <Input placeholder="Enter account number" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Account Holder Name</Label>
                    <Input placeholder="Full name as on bank account" />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <Label>Branch (optional)</Label>
                    <Input placeholder="e.g. Jakarta Pusat" />
                  </div>
                </TabsContent>

                <TabsContent
                  value="paypal"
                  className="flex flex-col gap-4 mt-4"
                >
                  <div className="flex flex-col gap-1.5">
                    <Label>PayPal Email</Label>
                    <Input type="email" placeholder="your@paypal.com" />
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setOpen(false)}>Save Method</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>

        <CardContent className="flex flex-col gap-3">
          {methods.map((method) => {
            const Icon = methodIcon[method.type];
            return (
              <div
                key={method.id}
                className={`flex items-center justify-between rounded-lg border px-4 py-3 transition-colors ${method.isPrimary ? "border-primary bg-primary/5" : "bg-card"}`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`rounded-md p-2 ${method.isPrimary ? "bg-primary/10" : "bg-muted"}`}
                  >
                    <Icon
                      className={`h-4 w-4 ${method.isPrimary ? "text-primary" : "text-muted-foreground"}`}
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium flex items-center gap-2">
                      {method.type} — {method.label}
                      {method.isPrimary && (
                        <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" /> Primary
                        </span>
                      )}
                    </p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {method.detail}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {!method.isPrimary && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setPrimary(method.id)}
                    >
                      Set as Primary
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-muted-foreground hover:text-red-500"
                    disabled={method.isPrimary}
                    onClick={() => removeMethod(method.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Payout Notifications</CardTitle>
          <CardDescription>
            Choose which payout events you want to be notified about and how.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium">Notify me when</p>
            {[
              {
                label: "Payout is successful",
                sub: "When funds have been settled to your account",
                value: notifSuccess,
                onChange: setNotifSuccess,
              },
              {
                label: "Payout fails",
                sub: "When a payout attempt is unsuccessful",
                value: notifFailed,
                onChange: setNotifFailed,
              },
              {
                label: "Payout is pending / processing",
                sub: "When a payout is initiated and in progress",
                value: notifPending,
                onChange: setNotifPending,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between"
              >
                <div>
                  <p className="text-sm font-medium">{item.label}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {item.sub}
                  </p>
                </div>
                <Switch checked={item.value} onCheckedChange={item.onChange} />
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium">Notification channels</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-md bg-muted p-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium">Email</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Send notifications to your registered email address
                  </p>
                </div>
              </div>
              <Switch checked={notifEmail} onCheckedChange={setNotifEmail} />
            </div>
          </div>

          <div className="flex justify-end">
            <Button>Save Notification Settings</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutSettingsPage;
