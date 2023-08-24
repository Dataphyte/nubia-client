# **IMPORTANT NOTES**

- [Things to Review](#review)
- [Issues to review](#issues)
- [Suggestions to consider](#suggestions)
- [Important Schemas](#schemas)

## REVIEW M<a name = 'review'></a>

- What happens when the user has set features and template but changes data
- What happens to a feature in template if it has been added to the template but deleted from the feature customization list

## ISSUES <a name = 'issues'></a>

- Ref on Template editor not returning Quill instance
- Based on above issue, inserting features in between template text is nearly impossible as cursor index cannot be determined (Lack of access to Quill instance === Lack of access to it's methods). Hence features can only be appended to temp0late text as a whole.
- Building a custom template editor will take forever and would definately involve a learning curve. Time consuming activities include design of the editor interface.

- What happens if the user wants to create a story with 2 different datasets that have different layout and field count.

## SUGGESTIONS <a name = 'suggestions'></a>

- Get a new template library

## IMPORTANT SCHEMAS <a name = 'schemas'></a>

### Project Schema

```js
{
  projectName: String, // Name of project
  projectDesc: String, // Description of project
  stories: [String], // Generated stories from data
  projectData: {
    parsed: { // PaoaParseObject
      data: [{Any}],
      errors: [{Any}],
      meta:{Any}
    },
    contents: String, // String version of the parsed dataset
    details: {
      fileName: String, // Name of file that has been parsed
      fileSize: String, // Size of parsed file
    },
   },
  dataFileUrl: String, // path to data file location
  template: String, // String from template Editor
  features: [
    {
      featureName: String, // Name of feature
      featureType: 'Data' | 'Custom', // Type of feature
      fieldRef: String, // Field reference to dataset (if type is Data)
      formula: [
            {
              type: 'Data' | 'Custom', // Type of value
              field?: String,  // Field from dataset (if the type is data)
              value: String | Number, // Value to add (if the type is custom)
              operand: '+' | '-' | '*' | '/' | null, // Operant to prefix with the next value
            }
       ],
       status: [
            {
              id: Number, // id of task for iterable key
              text: String, // Text for the task represnted
              complete: Boolean, // completeness of task
            }
       ]
    },
  ];
}
```

### Signup Schema

```js
{
  firstname: String,
  lastname: String,
  email: String,
  password: String,
  confirmPassword: String,
  accountType: 'personal'| 'organization',
  organization: {
    orgName: String,
    position: String, // position of account crerator in organization
    companySize: Number,
    niche: String // Niche of the company
  }
}
```

### ProjectData Schema
