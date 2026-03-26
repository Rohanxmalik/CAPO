"use client";

import { useState } from "react";
import { Save, UserPlus, Pause, Archive, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useProject } from "@/lib/hooks";
import { cn } from "@/lib/utils";

export default function ProjectPage() {
  const { activeProject } = useProject();

  const [formData, setFormData] = useState({
    name: activeProject?.name || "",
    description: activeProject?.description || "",
    status: activeProject?.status || "active",
    budget: activeProject?.budget || 0,
  });

  if (!activeProject) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Project Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your project details and team members
          </p>
        </div>
        <div className="rounded-lg border border-border/40 bg-card/30 p-8 text-center">
          <p className="text-muted-foreground">No project selected</p>
        </div>
      </div>
    );
  }

  const handleFormChange = (
    field: string,
    value: string | number
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case "admin":
        return "default";
      case "manager":
        return "secondary";
      case "viewer":
        return "outline";
      default:
        return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Project Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your project details and team members
        </p>
      </div>

      {/* Project Info Form */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4">
        <h2 className="text-xs font-semibold mb-4">Project Information</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-xs text-muted-foreground">
                Project Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleFormChange("name", e.target.value)}
                placeholder="Enter project name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="status" className="text-xs text-muted-foreground">
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => value && handleFormChange("status", value)}
              >
                <SelectTrigger id="status">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="paused">Paused</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="description"
              className="text-xs text-muted-foreground"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleFormChange("description", e.target.value)}
              placeholder="Enter project description"
              className="min-h-24 resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="budget" className="text-xs text-muted-foreground">
              Budget
            </Label>
            <div className="flex items-center">
              <span className="text-sm text-muted-foreground mr-2">$</span>
              <Input
                id="budget"
                type="number"
                value={formData.budget}
                onChange={(e) =>
                  handleFormChange("budget", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
                className="flex-1"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">Created</Label>
              <div className="px-3 py-2 rounded-md border border-border/40 bg-background/50">
                <p className="text-sm">{formatDate(activeProject.createdAt)}</p>
              </div>
            </div>
            <div className="space-y-2">
              <Label className="text-xs text-muted-foreground">
                Last Updated
              </Label>
              <div className="px-3 py-2 rounded-md border border-border/40 bg-background/50">
                <p className="text-sm">{formatDate(activeProject.updatedAt)}</p>
              </div>
            </div>
          </div>

          <Button className="w-full md:w-auto mt-4">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {/* Team Members */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4">
        <h2 className="text-xs font-semibold mb-4">Team Members</h2>
        <div className="space-y-3">
          {activeProject.teamMembers.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between py-3 px-3 rounded-md bg-background/30 hover:bg-background/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="size-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-medium">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <p className="text-sm font-medium">{member.name}</p>
                  <p className="text-xs text-muted-foreground">{member.email}</p>
                </div>
              </div>
              <Badge variant={getRoleBadgeVariant(member.role)}>
                {member.role}
              </Badge>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          className="w-full mt-4"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Invite Member
        </Button>
      </div>

      {/* Danger Zone */}
      <div className="rounded-lg border border-capo-crimson/30 bg-capo-crimson/5 p-4">
        <h2 className="text-xs font-semibold mb-4">Danger Zone</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium">Pause Project</p>
              <p className="text-xs text-muted-foreground">
                Temporarily pause this project
              </p>
            </div>
            <Button variant="outline" className="text-amber-600 hover:text-amber-600">
              <Pause className="w-4 h-4 mr-2" />
              Pause
            </Button>
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium">Archive Project</p>
              <p className="text-xs text-muted-foreground">
                Archive this project for later reference
              </p>
            </div>
            <Button variant="outline" className="text-muted-foreground">
              <Archive className="w-4 h-4 mr-2" />
              Archive
            </Button>
          </div>

          <Separator className="my-3" />

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm font-medium">Delete Project</p>
              <p className="text-xs text-muted-foreground">
                Permanently delete this project and all associated data
              </p>
            </div>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
