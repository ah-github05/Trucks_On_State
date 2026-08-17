# Contact Form Email Integration Design

**Date:** 2025-12-25
**Goal:** Make the contact form functional by integrating Web3Forms to forward messages to ccfoodcarts@gmail.com

## Current State

The contact form (`client/src/components/newsletter.tsx`) is a client-side React component that collects user input (name, email, message) but only simulates submission with a toast notification. No actual emails are sent.

## Proposed Solution

Integrate Web3Forms, a third-party form submission service, to handle email delivery. This is a pure frontend solution requiring no backend changes, which fits perfectly with the existing static Vercel deployment architecture.

## Architecture

**Email Flow:**
1. User fills out form in browser
2. Form submits POST request directly to Web3Forms API (`https://api.web3forms.com/submit`)
3. Web3Forms validates request using access key
4. Web3Forms forwards form data as email to ccfoodcarts@gmail.com
5. User receives success/error feedback via toast notification

**Authentication:**
- Access Key: Loaded via `VITE_WEB3FORMS_ACCESS_KEY` environment variable
- No backend secrets or environment variables needed

**Deployment Impact:**
- No changes to build process
- No changes to server configuration
- No changes to Vercel deployment setup
- Fully compatible with static site architecture

## Form Changes

### New Field
- **Inquiry Type** (dropdown, required)
  - Position: Between Name and Email fields
  - Options:
    - "Add my cart"
    - "General question"
    - "Report issue"

### Updated Field Order
1. Name (text input, required)
2. **Inquiry Type (dropdown, required)** ← NEW
3. Email (email input, required)
4. Message (textarea, required, 250-word limit)

### Existing Features Retained
- 250-word counter on message field
- Real-time word count validation
- Toast notifications for feedback
- Form field validation

## Form Submission Behavior

### Validation
1. Check all fields are filled (name, inquiry type, email, message)
2. If any field empty: Show "All fields required" error toast
3. If validation passes: Proceed with submission

### Submission Process
1. Show loading state on submit button
2. POST request to `https://api.web3forms.com/submit` with:
   - `access_key`: `VITE_WEB3FORMS_ACCESS_KEY` environment variable
   - `name`: User's name
   - `email`: User's email address
   - `subject`: Selected inquiry type
   - `message`: User's message text
3. Handle response:
   - **Success:** Clear all form fields, show toast "Message sent! We'll get back to you as soon as we can."
   - **Error:** Show toast "Failed to send message. Please try again."
4. Re-enable submit button

### Error Handling
- Network errors → User-friendly error toast
- Validation errors → "All fields required" toast
- Web3Forms API errors → "Failed to send message" toast

## Email Format

When a user submits the form, ccfoodcarts@gmail.com will receive:

**Subject:** [Selected inquiry type]
**From:** [User's email address]
**Body:**
```
Name: [User's name]

[User's message]
```

## Implementation Scope

### Files to Modify
- `client/src/components/newsletter.tsx` - Update form component

### Files Not Changed
- No backend files
- No build scripts
- No deployment configuration
- No environment variables

### New Dependencies
- None (uses native fetch API and existing shadcn/ui Select component)

## Testing Checklist

- [ ] Form validates all fields before submission
- [ ] Loading state displays during submission
- [ ] Success toast appears and form clears on successful submission
- [ ] Error toast appears if submission fails
- [ ] Email arrives at ccfoodcarts@gmail.com with correct formatting
- [ ] All three inquiry type options work correctly
- [ ] Word counter still works on message field
- [ ] Form styling remains consistent with site design
- [ ] Mobile responsive behavior maintained

## Rollback Plan

If issues arise, revert `client/src/components/newsletter.tsx` to previous version. No other systems affected since this is a purely frontend change.
