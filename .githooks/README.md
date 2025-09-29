# 🔍 Pre-Commit Hook for Bryan Hadden Music

This pre-commit hook prevents Vercel deployment failures by running the same checks locally that Vercel runs in production.

## 🚀 What It Does

### ✅ **Prevents Build Failures**
- **ESLint validation**: Catches code quality issues and unescaped HTML entities
- **TypeScript compilation**: Catches type errors before deployment
- **Next.js build**: Ensures the app builds successfully

### ✅ **Prevents Vercel-Specific Errors**
- **Filesystem import detection**: Prevents 250MB serverless function limit
- **'use client' directive placement**: Ensures directives are at top of files
- **Metadata/client component conflicts**: Prevents Next.js App Router errors
- **vercel.json validation**: Catches JSON syntax errors

### ✅ **Performance Monitoring**
- **Function size estimation**: Warns about potentially large functions
- **Heavy dependency detection**: Warns about bundle bloat
- **HTML entity validation**: Catches JSX rendering issues

## 🛠️ Setup (Already Done)

The hook is already configured and ready to use:

```bash
# Hook is executable
chmod +x .githooks/pre-commit

# Git is configured to use custom hooks
git config core.hooksPath .githooks
```

## 🎯 Usage

The hook runs automatically on every `git commit`. If any check fails, the commit is blocked:

```bash
# Normal workflow - hook runs automatically
git add .
git commit -m "Your commit message"  # Hook runs here
```

### If Hook Fails:
1. **Read the error message** - it tells you exactly what to fix
2. **Fix the issue** in your code
3. **Try committing again**

### Skip Hook (Emergency Only):
```bash
git commit --no-verify -m "Emergency commit (skip checks)"
```

## 📋 Check Details

### **Build Checks** (Fail Fast)
- ❌ **ESLint errors** → Fix linting issues
- ❌ **TypeScript errors** → Fix type issues
- ❌ **Build failures** → Fix compilation errors

### **Vercel-Specific Checks** (Prevent Deployment Failures)
- ❌ **Filesystem imports in API routes** → Use static redirects instead
- ❌ **'use client' not at top** → Move to first line
- ❌ **Metadata in client components** → Move to layout.tsx
- ❌ **Invalid vercel.json** → Fix JSON syntax

### **Warning Checks** (Informational)
- ⚠️ **Large functions** → Monitor for 250MB limit
- ⚠️ **Heavy dependencies** → Consider bundle optimization
- ⚠️ **Unescaped HTML entities** → Use `&bull;` `&apos;` etc.

## 🔧 Customization

Edit `.githooks/pre-commit` to:
- **Add new checks** for your specific needs
- **Adjust thresholds** (file sizes, import counts)
- **Modify warning levels** (error vs warning)

## 🎵 Benefits

1. **Faster Development**: Catch issues before deployment
2. **Zero Downtime**: No more failed Vercel builds
3. **Better Code Quality**: Automatic linting and type checking
4. **Cost Savings**: Prevent unnecessary build/deployment cycles
5. **Peace of Mind**: Know your code will deploy successfully

## 📝 Common Fixes

### **Filesystem Import Error**
```typescript
// ❌ BAD: Causes 250MB limit
import { readFile } from 'fs/promises';
const buffer = await readFile(filePath);

// ✅ GOOD: Use static redirects
const staticUrl = `/beats/${fileName}`;
return NextResponse.redirect(staticUrl);
```

### **'use client' Placement Error**
```typescript
// ❌ BAD: Not at top
import { useState } from 'react';
"use client";

// ✅ GOOD: First line
"use client";
import { useState } from 'react';
```

### **Metadata in Client Component**
```typescript
// ❌ BAD: Metadata in client component
"use client";
export const metadata = { title: "Page" };

// ✅ GOOD: Move to layout.tsx
// layout.tsx
export const metadata = { title: "Page" };
export default function Layout({ children }) {
  return <>{children}</>;
}
```

## 🚨 Emergency Bypass

Only use `--no-verify` in true emergencies:

```bash
# Emergency deployment (skip all checks)
git commit --no-verify -m "EMERGENCY: Critical hotfix"

# Still recommended to fix issues after emergency
git commit -m "Fix issues caught by pre-commit hook"
```

---

**Remember**: The hook saves you time by catching issues locally instead of waiting for Vercel to fail! 🚀
