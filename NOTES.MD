# <p align = 'center'>**IMPORTANT NOTES**</p>

## 📝 Table of Contents

- [Things to Review](#review)
- [Issues to review](#issues)
- [Suggestions to consider](#suggestions)
- [Important Schemas](#schemas)

## 👀 REVIEW <a name = 'review'></a>

- What happens when the user has set features and template but changes data
- What happens to a feature in template if it has been added to the template but deleted from the feature customization list

## ⚠️ ISSUES <a name = 'issues'></a>

- Ref on Template editor not returning Quill instance
- Based on above issue, inserting features in between template text is nearly impossible as cursor index cannot be determined (Lack of access to Quill instance === Lack of access to it's methods). Hence features can only be appended to temp0late text as a whole.
- Building a custom template editor will take forever and would definately involve a learning curve. Time consuming activities include design of the editor interface.

- What happens if the user wants to create a story with 2 different datasets that have different layout and field count.

## 💭 SUGGESTIONS <a name = 'suggestions'></a>

- Get a new template library

## 📋 IMPORTANT SCHEMAS <a name = 'schemas'></a>

### Project Schema

```ts
type ProjectSchema = {
  projectName: string; // Name of project
  projectDesc: string; // Description of project
  stories: [string]; // Generated stories from data
  projectData: {
    parsed: {
      // PaoaParseObject
      data: any[];
      errors: any[];
      meta: Object<any>;
    };
    contents: string; // string version of the parsed dataset
    details: {
      fileName: string; // Name of file that has been parsed
      fileSize: string; // Size of parsed file
    };
  };
  dataFileUrl: string; // path to data file location
  template: string; // string from template Editor
  features: [
    {
      featureName: string; // Name of feature
      featureType: 'Data' | 'Custom'; // Type of feature
      fieldRef: string; // Field reference to dataset (if type is Data)
      formula: [
        {
          type: 'Data' | 'Custom'; // Type of value
          field?: string; // Field from dataset (if the type is data)
          value: string; // Value to add (if the type is custom)
          operand: '+' | '-' | '*' | '/' | null; // Operant to prefix with the next value
        }
      ];
      status: [
        {
          id: number; // id of task for iterable key
          text: string; // Text for the task represnted
          complete: boolean; // completeness of task
        }
      ];
    }
  ];
};
```

### Signup Schema

```ts
type SignupSchema = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountType: 'personal' | 'organization';
  organization: {
    orgName: string;
    position: string; // position of account crerator in organization
    companySize: number;
    niche: string; // Niche of the company
  };
};
```

### Subscription Schema

```ts

type SubType = {
  projects: number;
}

type SubSchema:{standard:subType, premium:subType} ={
standard: SubType;
}

const Subsobject:SubSchema = {
  FREE: {
    projects: 2
    storyLength: 200,
    fileSize: '20kb',
    rewrites: 3,
    features: 10
  },

  STANDARD: {
    projects: 3
    storyLength: 500,
    fileSize: '50kb',
    rewrites: 5,
    features: 20
  },

   PREMIUM: {
    projects: 5
    storyLength: 1000,
    fileSize: '2000kb',
    rewrites: 10,
    features: 50
  },

   GOLD: {
    projects: Infinity
    storyLength: 2000,
    fileSize: '10000kb',
    rewrites: INFINITY,
    features: INFINITY
  },

   ENTREPRENEUR: {
    projects: Infinity
    storyLength: 2000,
    fileSize: INFINITY,
    rewrites: INFINITY,
    features: INFINITY
  },
};


```
