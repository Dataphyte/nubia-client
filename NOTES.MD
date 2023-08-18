## REVIEW

- What happens when the user has set features and template but changes data
- What happens to a feature in template if it has been added to the template but deleted from the feature customization list

## ISSUES

- Ref on Template editor not returning Quill instance
- Based on above issue, inserting features in between template text is nearly impossible as cursor index cannot be determined (Lack of access to Quill instance === Lack of access to it's methods). Hence features can only be appended to temp0late text as a whole.
- Building a custom template editor will take forever and would definately involve a learning curve. Time consuming activities include design of the editor interface.

## SUGGESTIONS

- Get a new template library

## Signup req

- Firstname
- Last name
- Email address
- Password (min 8 chars)
- Confirm password.
- Account type (private | organisational)
- (Org)
  - Position in organization
  - Company size
  - Field | Niche of organisation
