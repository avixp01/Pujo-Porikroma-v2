# Workspace Code Preservation Rules

**Additive-Only Rule**: 
When implementing new features (such as route automation, back-button state management, or new pages), you must only append or integrate the new logic into existing components or isolate them into new modular files.

**Prohibition on Overwriting**: 
Never rewrite, replace, or truncate existing files wholesale. Do not remove existing event listeners, state handlers (like browser popstate back-button handling), map markers, or UI bindings unless explicitly instructed to delete them manually.

**Asset & State Lock**: 
Strictly preserve all current features—including the 381 pandal markers, route automation redirection, multi-modal navigation, custom brown themes, button shadows, fonts, songs, and background assets.

**Scope Verification**: 
Before outputting any code changes, verify that all previously implemented map and navigation functionalities remain fully intact and operational.

**Zero Unsolicited Modifications**:
Do not modify, refactor, reconfigure, or touch any code, styles, colors, class names, or logic outside of the explicitly requested target component. Fixing one file must never result in automatic changes, imports breaking, or state alterations in the landing page, map view, login modal, or audio player.

**Strict Component Isolation**:
Treat the map UI, landing page, login forms, and global theme files as completely independent modules. Any update must be strictly localized to the specific file being edited.

**Preservation Lock**:
Lock all existing website layouts, custom fonts (LiAdorTrikonomitiUnicode), pandal map markers, audio elements, and UI colors exactly as they were before this prompt. Do not rewrite working code unless explicitly told to do so. During this change, no song should be deleted, no icon should be changed or deleted, no font should be changed or deleted, no button shadow or button functionality should not be changed or deleted, no icon should be changed or deleted, and no background should be changed or deleted in map.
