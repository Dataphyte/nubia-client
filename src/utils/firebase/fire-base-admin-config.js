import { initializeApp, getApps, cert } from 'firebase-admin/app';

const firebaseAdminConfig = {
  credential: cert({
    projectId: 'nubia-test-001',
    clientEmail:
      'firebase-adminsdk-ocn7g@nubia-test-001.iam.gserviceaccount.com',
    privateKey:
      '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChgO+gqlOmi14D\n+Zcgu8SzLxjYAIJuxLqr6hakUJS9qMSI2wf41Byk5SYlu2yJFcEEgVoVR0k1ppAi\nORc06q7slUrb+0/yyJdznQ36gUGuKlT4Q+Y+J+B3jas7snOZ4s13b5fFr8vc/MnW\nCNMgYXAwAkr56fec7Lgwf7305tqHUoHmU/ypvbehlRo1eY8wk4UjIAV2qtFh2TzW\niGU+Xu3yQw5lA2XRcuNgC27Rfq7e0Mh7If1v/j1gAwQV0rbONzDxGZINWa5nAslO\nCFB6hHczWdv078OtVE7uopBQG5Nr/cXd3eP49HUJMm5kPyY9+2IPi1uDrFTvlPuh\n4KF0Oy7nAgMBAAECggEAEdHiCXu8XB7PjP0P9aQniXp+XBhToU43/KUJF4XuoNig\nytWZamquYxaySq0vRhbuOQWJai9MlCILOu4gBzjdJoHjLyTqcYg8McetVavHvU8I\nGMFBLoWEM8d1Z9JXsANBltaWIVFgMJjR2mRsizZFGdRURSv8JBv4ch1+LlSp3blf\nTXgMKGDU+sXEX6l5mVru2P2iE5vDFCHlYpLdYk4imgCis1T2jSg2B8rFLgt3Zsq5\nMe/lUvULvy35L0o2cyJi6HMXyqVevWHd4OznetpYwdQi6vGniDDSXFGyKFAi4Rwy\nE+MaSNVo7W4rmVhQ/UJ5TwNReMb7TCjF/qxB/nO4+QKBgQDdtDbzgrarlPNJFUIH\nV9etfyLWmczH0KnjIeWi5C3/bYK+0n/PVYzgz9uEN7l1h7VCQIvpBmOiglfU6ghL\nBWBNGRpo8OgIvGkgTgvK4j9neXodX6mYKxJjimMdcN8fMYkMfOk5msMfWLeSahaM\n2sxLtoafAuPmBBf2+GeBtPDG7wKBgQC6fLSbM49wgvGbyHE3IqcT3latfoIYyzpa\noIxEtx2ZdarWifPh1uWPk5A3s57nI4WdHFr45HXfrJHXTJIrimhHp5D65ZCLrBPU\nh07AwrqrfvTe9Ka5hlb/8Amq49P7G7rhA7wsz1xyC9+Yc9/uFDDd5jLLl8XB/IUv\nTlUvTJLXiQKBgQCR4UojMwhloG3w0dcPo+Jb3AMdeDgB5rBSrvQ+GayWnQVh8Hp+\n/8jiCINl3ZDf3/sJ7BTjsPuQa/nFNHVef9wc/v6cvJ/BV9BInHIv/m0/9fO/LjoW\n0YiZDO8o6SM3kE2gdPS1nbr0fljUM5BBAJta2nB8Ytd4e4sVS+A3vcqM6wKBgEv/\njkrBlG8xrezinuDtSlGahpBlwfcAu2M7km5egb2ManbL+YvL2/nLFTbeCKABpe4F\nJD3SPQdOeJDZL6h221B4RWk6LNH+6oXuLnX35cMGFhzWbyukR8g9tnLiLf1jq6EP\nuJw6VV5U4GZsspF/wPptWb4GuBz6H/zLW4PPHPihAoGAJR/AwFURptDsqYJtgcz1\npCEYZeDVzKTejvDz+DAiO/SBGky4KJw/2IU0Q8ElkSWf5Agd6k57tVRxJIGF3nt0\nuc5NFIxYnbntDyI7FF5WU43U4uXLhxQjZ+30qyfG2vG46GlExmgBVM759gT1+GDQ\n6Livko0OzcspGBh6LhE4qHo=\n-----END PRIVATE KEY-----\n',
  }),
};

export const customInitApp = () =>
  getApps().length <= 0 && initializeApp(firebaseAdminConfig);
