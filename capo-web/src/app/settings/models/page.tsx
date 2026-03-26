"use client";

import { useState } from "react";
import { Key, Shield, ArrowDownUp, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface Model {
  id: string;
  name: string;
  provider: "openai" | "anthropic" | "google";
  costPer1K: string;
  enabled: boolean;
}

interface ApiKeyState {
  openai: string;
  anthropic: string;
  google: string;
}

interface ApiKeyConfigured {
  openai: boolean;
  anthropic: boolean;
  google: boolean;
}

const initialModels: Model[] = [
  {
    id: "gpt4o",
    name: "GPT-4o",
    provider: "openai",
    costPer1K: "$0.005",
    enabled: true,
  },
  {
    id: "gpt4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    costPer1K: "$0.0003",
    enabled: true,
  },
  {
    id: "claude-opus",
    name: "Claude 4 Opus",
    provider: "anthropic",
    costPer1K: "$0.015",
    enabled: true,
  },
  {
    id: "claude-sonnet",
    name: "Claude 4 Sonnet",
    provider: "anthropic",
    costPer1K: "$0.003",
    enabled: true,
  },
  {
    id: "claude-haiku",
    name: "Claude Haiku",
    provider: "anthropic",
    costPer1K: "$0.00025",
    enabled: true,
  },
  {
    id: "gemini-pro",
    name: "Gemini 2.5 Pro",
    provider: "google",
    costPer1K: "$0.007",
    enabled: false,
  },
];

const getProviderColor = (provider: string) => {
  switch (provider) {
    case "openai":
      return "bg-emerald-500/15 text-emerald-400";
    case "anthropic":
      return "bg-amber-500/15 text-amber-400";
    case "google":
      return "bg-blue-500/15 text-blue-400";
    default:
      return "bg-gray-500/15 text-gray-400";
  }
};

const getProviderLabel = (provider: string) => {
  switch (provider) {
    case "openai":
      return "OpenAI";
    case "anthropic":
      return "Anthropic";
    case "google":
      return "Google";
    default:
      return provider;
  }
};

export default function ModelsPage() {
  const [models, setModels] = useState<Model[]>(initialModels);
  const [apiKeys, setApiKeys] = useState<ApiKeyState>({
    openai: "",
    anthropic: "",
    google: "",
  });
  const [apiKeyConfigured, setApiKeyConfigured] = useState<ApiKeyConfigured>({
    openai: false,
    anthropic: false,
    google: false,
  });
  const [defaultModel, setDefaultModel] = useState("gpt4o");
  const [fallbackModel, setFallbackModel] = useState("gpt4o-mini");
  const [autoDowngrade, setAutoDowngrade] = useState(true);
  const [preferCostEfficient, setPreferCostEfficient] = useState(false);

  const toggleModel = (id: string) => {
    setModels(
      models.map((model) =>
        model.id === id ? { ...model, enabled: !model.enabled } : model
      )
    );
  };

  const handleApiKeyChange = (
    provider: "openai" | "anthropic" | "google",
    value: string
  ) => {
    setApiKeys((prev) => ({
      ...prev,
      [provider]: value,
    }));
  };

  const verifyApiKey = (provider: "openai" | "anthropic" | "google") => {
    if (apiKeys[provider].trim()) {
      setApiKeyConfigured((prev) => ({
        ...prev,
        [provider]: true,
      }));
    }
  };

  const enabledModels = models.filter((m) => m.enabled);
  const modelOptions = models.map((m) => m.id);

  return (
    <div className="space-y-6">
      {/* Model Configuration Panel */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4">
        <h3 className="text-xs font-semibold mb-4">Model Configuration</h3>
        <div className="space-y-2">
          {models.map((model) => (
            <div
              key={model.id}
              className="flex items-center gap-3 hover:bg-accent/20 rounded-md p-2 transition"
            >
              <Switch
                checked={model.enabled}
                onCheckedChange={() => toggleModel(model.id)}
              />
              <div className="flex-1">
                <p className="text-sm font-medium">{model.name}</p>
                <p className="text-xs text-muted-foreground">
                  {model.costPer1K} per 1K tokens
                </p>
              </div>
              <Badge
                variant="secondary"
                className={cn("text-xs", getProviderColor(model.provider))}
              >
                {getProviderLabel(model.provider)}
              </Badge>
            </div>
          ))}
        </div>
      </div>

      <Separator className="bg-border/20" />

      {/* API Key Manager */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4">
        <div className="flex items-center gap-2 mb-4">
          <Key className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-xs font-semibold">API Key Manager</h3>
        </div>

        <div className="space-y-4">
          {/* OpenAI API Key */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">
                OpenAI API Key
              </Label>
              {apiKeyConfigured.openai ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-gray-500/50" />
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="sk-..."
                value={apiKeys.openai}
                onChange={(e) => handleApiKeyChange("openai", e.target.value)}
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => verifyApiKey("openai")}
              >
                Verify
              </Button>
            </div>
          </div>

          {/* Anthropic API Key */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">
                Anthropic API Key
              </Label>
              {apiKeyConfigured.anthropic ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-gray-500/50" />
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="sk-ant-..."
                value={apiKeys.anthropic}
                onChange={(e) => handleApiKeyChange("anthropic", e.target.value)}
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => verifyApiKey("anthropic")}
              >
                Verify
              </Button>
            </div>
          </div>

          {/* Google API Key */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Label className="text-xs text-muted-foreground">
                Google API Key
              </Label>
              {apiKeyConfigured.google ? (
                <Check className="w-3 h-3 text-green-500" />
              ) : (
                <div className="w-3 h-3 rounded-full bg-gray-500/50" />
              )}
            </div>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="AIza..."
                value={apiKeys.google}
                onChange={(e) => handleApiKeyChange("google", e.target.value)}
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => verifyApiKey("google")}
              >
                Verify
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Separator className="bg-border/20" />

      {/* Routing Rules */}
      <div className="rounded-lg border border-border/40 bg-card/30 p-4">
        <div className="flex items-center gap-2 mb-4">
          <ArrowDownUp className="w-4 h-4 text-muted-foreground" />
          <h3 className="text-xs font-semibold">Routing Rules</h3>
        </div>

        <div className="space-y-4">
          {/* Default Model */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Default Model
            </Label>
            <Select value={defaultModel} onValueChange={(v) => v && setDefaultModel(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enabledModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Fallback Model */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">
              Fallback Model
            </Label>
            <Select value={fallbackModel} onValueChange={(v) => v && setFallbackModel(v)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {enabledModels.map((model) => (
                  <SelectItem key={model.id} value={model.id}>
                    {model.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Auto-downgrade on budget warning */}
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">
              Auto-downgrade on budget warning
            </Label>
            <Switch checked={autoDowngrade} onCheckedChange={setAutoDowngrade} />
          </div>

          {/* Prefer cost-efficient models */}
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground">
              Prefer cost-efficient models
            </Label>
            <Switch
              checked={preferCostEfficient}
              onCheckedChange={setPreferCostEfficient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
