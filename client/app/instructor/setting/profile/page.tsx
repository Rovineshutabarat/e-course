"use client";

import {
  Camera,
  Github,
  Globe,
  Instagram,
  Linkedin,
  Lock,
  Twitter,
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

const ProfileSettingsPage = () => {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("john@mail.com");
  const [phone, setPhone] = useState("+62 812 3456 7890");
  const [bio, setBio] = useState(
    "Passionate software engineer and educator with 8+ years of experience building web applications.",
  );
  const [headline, setHeadline] = useState("Full Stack Developer & Instructor");
  const [website, setWebsite] = useState("https://johndoe.dev");
  const [language, setLanguage] = useState("English");

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Profile Settings</h2>
        <p className="text-sm mt-1 text-muted-foreground">
          Manage your personal information, public profile, and account
          security.
        </p>
      </div>

      {/* Profile — basic info + public profile + social links */}
      <Card>
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Your personal details, public instructor profile, and social links.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-6">
          {/* Avatar */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                JD
              </div>
              <button className="absolute bottom-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center shadow">
                <Camera className="h-3 w-3 text-white" />
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium">Profile Photo</p>
              <p className="text-xs text-muted-foreground">
                JPG, PNG or GIF. Max size 2MB.
              </p>
              <div className="flex gap-2 mt-1">
                <Button variant="outline" size="sm">
                  Upload Photo
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-600"
                >
                  Remove
                </Button>
              </div>
            </div>
          </div>

          <Separator />

          {/* Basic info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <Label>Full Name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Email Address</Label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <Label>Phone Number</Label>
              <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Bio</Label>
            <Textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={3}
              placeholder="Tell students a little about yourself..."
            />
            <p className="text-xs text-muted-foreground text-right">
              {bio.length}/500
            </p>
          </div>

          <Separator />

          {/* Public profile */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium">Instructor Public Profile</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Displayed on your courses and instructor page.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Headline</Label>
              <Input
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. Full Stack Developer & Instructor"
              />
              <p className="text-xs text-muted-foreground">
                A short tagline shown below your name on course pages.
              </p>
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Website</Label>
              <Input
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                placeholder="https://yourwebsite.com"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <Label>Teaching Language</Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="English">English</SelectItem>
                  <SelectItem value="Indonesian">Indonesian</SelectItem>
                  <SelectItem value="Mandarin">Mandarin</SelectItem>
                  <SelectItem value="Spanish">Spanish</SelectItem>
                  <SelectItem value="Arabic">Arabic</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                The primary language you teach in.
              </p>
            </div>
          </div>

          <Separator />

          {/* Social links */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-sm font-medium">Social Media Links</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Add your social profiles so students can follow your work.
              </p>
            </div>

            {[
              {
                label: "Twitter / X",
                icon: Twitter,
                placeholder: "https://twitter.com/username",
              },
              {
                label: "LinkedIn",
                icon: Linkedin,
                placeholder: "https://linkedin.com/in/username",
              },
              {
                label: "Instagram",
                icon: Instagram,
                placeholder: "https://instagram.com/username",
              },
              {
                label: "GitHub",
                icon: Github,
                placeholder: "https://github.com/username",
              },
              {
                label: "Personal Website",
                icon: Globe,
                placeholder: "https://yourwebsite.com",
              },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-1.5">
                <Label>{item.label}</Label>
                <div className="flex items-center gap-2">
                  <div className="rounded-md bg-muted p-2 shrink-0">
                    <item.icon className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input placeholder={item.placeholder} />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end">
            <Button>Save Profile</Button>
          </div>
        </CardContent>
      </Card>

      {/* Password & Security */}
      <Card>
        <CardHeader>
          <CardTitle>Password & Security</CardTitle>
          <CardDescription>
            Update your password to keep your account secure.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <Label>Current Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter current password"
                className="pl-9"
              />
            </div>
          </div>

          <Separator />

          <div className="flex flex-col gap-1.5">
            <Label>New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Enter new password"
                className="pl-9"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label>Confirm New Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Re-enter new password"
                className="pl-9"
              />
            </div>
          </div>

          <ul className="text-xs text-muted-foreground flex flex-col gap-1 mt-1">
            <li>• Minimum 8 characters</li>
            <li>• At least one uppercase letter</li>
            <li>• At least one number or special character</li>
          </ul>

          <div className="flex justify-end">
            <Button>Update Password</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettingsPage;
