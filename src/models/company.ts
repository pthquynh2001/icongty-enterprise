import mongoose, { Schema, models } from 'mongoose';

const companySchema = new Schema(
  {
    service: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Service' }],
    product: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
    token: { type: String },
    author: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      username: { type: String, ref: 'User' },
      email: { type: String, ref: 'User' },
      phone: { type: String, ref: 'User' },
      lastName: { type: String, ref: 'User' },
      firstName: { type: String, ref: 'User' },
      avatar: { type: String, ref: 'User' },
    },
    status: String,
    publishedLanguage: [String],
    name: String,
    slug: String,
    internationalName: String,
    internationalNameSort: String,
    taxCode: String,
    keyword: String,
    country: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
      lang: String,
    },
    city: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
      lang: String,

      name: String,
      countryCode: String,
      country: { type: mongoose.Schema.Types.ObjectId, ref: 'Country' },
    },
    address: String,
    representative: String,
    phone: String,
    email: String,
    foundationDate: Date,
    website: String,
    companySize: Number,
    incorporationType: String,
    coverPhoto: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'CoverPhoto' },
      name: String,
      originalname: String,
      size: Number,
      extension: String,
      mimetype: String,
      location: String,
      width: Number,
      height: Number,
      alt: String,
      caption: String,
      description: String,
    },
    logo: {
      _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Logo' },
      name: String,
      originalname: String,
      size: Number,
      extension: String,
      mimetype: String,
      location: String,
      width: Number,
      height: Number,
      alt: String,
      caption: String,
      description: String,
    },
    excerpt: String,
    categories: [
      {
        _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
        lang: String,
        code: String,
        name: String,
      },
    ],
    technologies: [],
    portfolio: [],
    businessStatus: String,
    services: [],
    products: [],
    members: [],
    isSupported: Boolean,
    typical: Boolean,
    nameSort: String,
  },
  {
    timestamps: true,
  }
);

const Company = models.Company || mongoose.model('Company', companySchema);

export default Company;
