# Community Settings Components

This directory contains components for managing community settings in the modal:

- **AdminManager**: Handles adding and removing community admins
- **DangerZone**: Contains destructive actions like community deletion  
- **ImageSettings**: Manages community profile image upload and deletion
- **ModalFooter**: Shared footer with Cancel/Save buttons
- **PrivacySettings**: Controls community visibility and posting permissions

## Usage

Components are exported from the index file for easy importing:

```typescript
import { 
  AdminManager, 
  DangerZone, 
  ImageSettings, 
  ModalFooter, 
  PrivacySettings 
} from "./community-settings";
```
