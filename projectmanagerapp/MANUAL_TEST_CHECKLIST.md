# Manual Test Execution Checklist

## 🚀 Quick Start Testing (15 minutes)

### ✅ Basic Functionality Test
1. **Start the app**: `npm run dev`
2. **Navigation Test**:
   - [ ] Click Dashboard - loads correctly
   - [ ] Click Projects - loads correctly  
   - [ ] Click Tasks - loads correctly
   - [ ] Click Settings - loads correctly

3. **Create Project Test**:
   - [ ] Go to Projects page
   - [ ] Enter name: "Test Project 1"
   - [ ] Enter description: "Testing basic functionality"
   - [ ] Click Create Project
   - [ ] Project appears in list ✓

4. **Create Task Test**:
   - [ ] Go to Tasks page
   - [ ] Enter task name: "Test Task 1"
   - [ ] Select the project you created
   - [ ] Set priority to "High"
   - [ ] Click Add Task
   - [ ] Task appears in list ✓

5. **Dashboard Test**:
   - [ ] Go to Dashboard
   - [ ] See project card with 0/1 tasks completed
   - [ ] Progress bar shows 0%
   - [ ] Task appears in recent tasks ✓

6. **Status Toggle Test**:
   - [ ] Click the check circle on task
   - [ ] Status changes to completed
   - [ ] Dashboard progress updates to 100% ✓

## 🔍 Critical Bug Hunt (30 minutes)

### Test Data Setup
Create this test data first:
- **Project A**: "E-commerce Website" (3 tasks: 2 completed, 1 pending)
- **Project B**: "Mobile App" (5 tasks: 1 completed, 4 pending)  
- **Project C**: "Marketing Campaign" (0 tasks)

### Bug Hunt Checklist

#### 1. Data Consistency Bugs
- [ ] Create task → Check it appears on Dashboard immediately
- [ ] Toggle task status → Progress bar updates instantly
- [ ] Delete task → Progress recalculates correctly
- [ ] Edit project name → Updates everywhere (Dashboard, Tasks dropdown)
- [ ] Delete project → All associated tasks also deleted

#### 2. Form Validation Bugs
- [ ] Try submitting empty project name → Should prevent submission
- [ ] Try submitting empty task name → Should prevent submission
- [ ] Try creating task without selecting project → Should prevent submission
- [ ] Enter very long project name (200+ chars) → Should handle gracefully

#### 3. UI/UX Bugs
- [ ] Resize browser window → Layout stays responsive
- [ ] Long project names → Should truncate with ellipsis
- [ ] Long task names → Should not break layout
- [ ] Click outside modal → Modal should close
- [ ] Press Escape in modal → Modal should close

#### 4. State Management Bugs
- [ ] Refresh page → All data persists
- [ ] Open new tab → Same data appears
- [ ] Clear browser data → App handles empty state
- [ ] Create 10+ projects → Performance stays good

#### 5. Edge Case Bugs
- [ ] Create project with only spaces in name → Should trim or reject
- [ ] Set due date in the past → Should accept but maybe warn
- [ ] Create task with special characters (émojis 🚀) → Should display correctly
- [ ] Toggle task status rapidly → Should not cause race conditions

## 🎯 User Journey Testing (20 minutes)

### Scenario 1: New User Experience
**Goal**: Test first-time user flow
1. [ ] Open app with no data
2. [ ] See empty state messages
3. [ ] Create first project easily
4. [ ] Add first task successfully
5. [ ] Understand how to mark tasks complete

### Scenario 2: Daily Usage
**Goal**: Test typical daily workflow
1. [ ] Open app with existing data
2. [ ] Check Dashboard for project status
3. [ ] Add new task to existing project
4. [ ] Mark some tasks as complete
5. [ ] Edit project details
6. [ ] Delete completed tasks

### Scenario 3: Project Completion
**Goal**: Test project lifecycle
1. [ ] Create project with 5 tasks
2. [ ] Complete tasks one by one
3. [ ] Watch progress bar update
4. [ ] Complete all tasks (100%)
5. [ ] Delete completed project

## 🐛 Common Issues to Look For

### High Priority Issues
- [ ] **Data Loss**: Tasks/projects disappearing
- [ ] **Broken Navigation**: Pages not loading
- [ ] **Form Failures**: Can't create projects/tasks
- [ ] **Progress Errors**: Wrong percentages shown
- [ ] **Delete Failures**: Items not actually deleted

### Medium Priority Issues  
- [ ] **Layout Breaks**: Text overflow, misaligned elements
- [ ] **Slow Performance**: Laggy interactions
- [ ] **Validation Issues**: Can create invalid data
- [ ] **Accessibility**: Can't use with keyboard only
- [ ] **Mobile Issues**: Doesn't work on phone

### Low Priority Issues
- [ ] **Visual Glitches**: Minor styling issues
- [ ] **Inconsistent Spacing**: Uneven margins/padding
- [ ] **Missing Tooltips**: Unclear button purposes
- [ ] **Color Contrast**: Hard to read text
- [ ] **Animation Issues**: Jerky transitions

## 📱 Mobile Testing (10 minutes)

### Responsive Design Check
1. [ ] Open browser dev tools
2. [ ] Switch to mobile view (375px width)
3. [ ] Test all pages load correctly
4. [ ] Navigation menu works on mobile
5. [ ] Forms are usable on small screen
6. [ ] Cards stack properly
7. [ ] Text remains readable
8. [ ] Buttons are touch-friendly

## 🔧 Browser Compatibility (15 minutes)

### Test in Multiple Browsers
- [ ] **Chrome**: All features work
- [ ] **Firefox**: All features work  
- [ ] **Safari**: All features work
- [ ] **Edge**: All features work

### LocalStorage Test
1. [ ] Create data in one browser
2. [ ] Close browser completely
3. [ ] Reopen browser
4. [ ] Verify data persists
5. [ ] Repeat in different browser

## 📊 Performance Check (5 minutes)

### Quick Performance Test
1. [ ] Open browser dev tools → Performance tab
2. [ ] Record while navigating between pages
3. [ ] Check for:
   - [ ] Page loads under 2 seconds
   - [ ] No memory leaks
   - [ ] Smooth animations
   - [ ] No console errors

## 🎨 Visual Quality Check (5 minutes)

### Design Consistency
- [ ] Colors match throughout app
- [ ] Fonts are consistent
- [ ] Spacing is even
- [ ] Icons are aligned
- [ ] Buttons have consistent styling
- [ ] Cards have consistent layout
- [ ] Loading states look good

## 🚨 Critical Issues Found?

### If you find bugs, document:
1. **What you did** (exact steps)
2. **What happened** (actual result)
3. **What should happen** (expected result)
4. **Browser/device** used
5. **Screenshot** if visual issue

### Severity Levels:
- **Critical**: App crashes, data loss, can't use core features
- **High**: Major features broken, poor user experience
- **Medium**: Minor features broken, workarounds exist
- **Low**: Cosmetic issues, nice-to-have improvements

## ✅ Test Completion

### Sign-off Checklist:
- [ ] All critical functionality works
- [ ] No data loss issues found
- [ ] App works on mobile
- [ ] App works in multiple browsers
- [ ] Performance is acceptable
- [ ] No major accessibility issues
- [ ] Ready for production use

**Tester**: ________________  
**Date**: ________________  
**Overall Rating**: ⭐⭐⭐⭐⭐ (1-5 stars)  
**Recommendation**: [ ] Ship it! [ ] Needs fixes [ ] Major rework needed