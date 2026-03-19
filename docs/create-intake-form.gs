/**
 * Client Intake Questionnaire — Google Apps Script
 * Run this once in script.google.com to create the full 80-question form.
 * After running, check the Execution Log for the edit and response URLs.
 */
function createIntakeForm() {
  const form = FormApp.create('Client Website Intake Questionnaire');
  form.setDescription(
    'Thank you for choosing us to build your website! Please complete all sections as thoroughly as possible. ' +
    'This form takes 20–30 minutes. Your answers go directly to our build team — the more detail you provide, ' +
    'the better your site will match your vision. Fields marked (optional) can be left blank and we will draft them for you.'
  );
  form.setCollectEmail(false);
  form.setProgressBar(true);

  // ─────────────────────────────────────────────
  // SECTION 1 — Business Basics
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 1 — Business Basics')
    .setHelpText('Foundational information that appears in your site header, footer, and contact page.');

  form.addTextItem()
    .setTitle('1. Business name')
    .setRequired(true);

  form.addTextItem()
    .setTitle('2. Tagline or slogan')
    .setHelpText('Leave blank if you do not have one.')
    .setRequired(false);

  form.addListItem()
    .setTitle('3. Industry / type of business')
    .setChoiceValues([
      'Medical / Health',
      'Legal',
      'Beauty / Wellness',
      'Food & Beverage',
      'Home Services',
      'Retail',
      'Professional Services',
      'Other'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('4. Do you serve customers at one location, multiple locations, or remotely/online?')
    .setChoiceValues([
      'One location',
      'Multiple locations',
      'Remotely / Online only'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('5. Business address(es)')
    .setHelpText('List all locations if you have multiple. Include street, city, state, and zip.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('6. City, State')
    .setHelpText('Primary city and state (used in page titles and metadata).')
    .setRequired(true);

  form.addTextItem()
    .setTitle('7. Phone number')
    .setRequired(true);

  form.addTextItem()
    .setTitle('8. Primary email address')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('9. Business hours')
    .setHelpText('e.g. Mon–Fri 9am–5pm, Sat 10am–3pm, Closed Sun')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('10. Do you have an existing website?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('11. If yes, what is the URL of your existing website?')
    .setHelpText('Leave blank if you answered No above.')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // SECTION 2 — Goals & Audience
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 2 — Goals & Audience')
    .setHelpText('These answers shape your homepage headline, calls-to-action, and overall site strategy.');

  form.addMultipleChoiceItem()
    .setTitle('12. What is the #1 thing you want visitors to do on your site?')
    .setChoiceValues([
      'Call us',
      'Fill out a contact form',
      'Book an appointment',
      'Visit us in person',
      'Buy a product',
      'Other'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('13. If your homepage had one headline, what would it say?')
    .setHelpText('We will refine it — just give us a starting point. e.g. "Exceptional Skin Care Trusted for 20 Years"')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('14. Write 1–2 sentences that expand on that headline')
    .setHelpText('This becomes the subheading visitors see immediately below the main headline.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('15. What is the #1 problem your business solves for customers?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('16. Who is your ideal customer?')
    .setHelpText('Describe their age, lifestyle, situation, or what brings them to you.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('17. What makes you different from competitors?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('18. Are there any competitor websites you like or dislike?')
    .setHelpText('List URLs and note what you like or dislike about each. This is for strategy — not design inspiration (we will ask about that separately).')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('19. What words should people associate with your brand? (select all that apply)')
    .setChoiceValues([
      'Trustworthy',
      'Luxury',
      'Friendly',
      'Professional',
      'Modern',
      'Affordable',
      'Expert',
      'Caring',
      'Bold',
      'Innovative'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('20. What is the one thing you want every visitor to walk away believing about your business?')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('21. Write 1–2 sentences for your website footer that summarize who you are and what you stand for')
    .setHelpText('(optional) — we will draft one for you if you leave this blank.')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // SECTION 3 — Pages & Structure
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 3 — Pages & Structure')
    .setHelpText('This determines your site navigation and how many pages we build.');

  form.addCheckboxItem()
    .setTitle('22. Which pages do you need? (select all that apply)')
    .setChoiceValues([
      'Home',
      'About Us',
      'Services / Menu',
      'Individual Service Pages',
      'Team / Staff',
      'Testimonials / Reviews',
      'Gallery / Portfolio',
      'Blog',
      'FAQ',
      'Contact',
      'Pricing',
      'Other'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('23. Do you want a dedicated page per service, or one page listing all services?')
    .setChoiceValues([
      'One page for all services',
      'Separate page per service',
      'Not sure'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('24. Do you want an About page focused on the business, the founder/owner, or both?')
    .setChoiceValues([
      'The business',
      'The founder / owner',
      'Both'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('25. List all services or products you offer (one per line)')
    .setHelpText('If you leave Q26 blank, we will write the descriptions for you based on these names.')
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('26. For each service above, write 2–3 sentences describing it')
    .setHelpText('(optional) — leave blank and we will draft descriptions based on your service names.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('27. Do you want a blog or news section?')
    .setChoiceValues(['Yes', 'No', 'Maybe later'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('28. Any pages or sections you have seen on other sites that you would love to include?')
    .setHelpText('Describe or paste a URL with a note about what you liked.')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // SECTION 4 — Content
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 4 — Content')
    .setHelpText('This section covers all the text, media, and copy that goes on your site.');

  form.addMultipleChoiceItem()
    .setTitle('29. Who will write the copy (text) for the site?')
    .setChoiceValues([
      'We will provide it',
      'You write it for us',
      'Mix — we will provide some, you write the rest'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('30. Do you have a bio or "About" write-up ready?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('31. If yes, paste your bio or About write-up here')
    .setHelpText('Leave blank if you answered No above.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('32. Do you have customer testimonials or reviews we can use?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('33. If yes, paste up to 5 testimonials')
    .setHelpText('For each, include: Name, City/Location, and their quote. e.g. "Jane D., San Francisco — This place changed my life!"')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('34. Do you have team/staff bios and headshots?')
    .setChoiceValues(['Yes', 'No', 'Not applicable — solo practitioner'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('35. Do you have professional photos of your business, space, or work?')
    .setChoiceValues([
      'Yes — I will upload them in Section 7',
      'No — I will need stock photos'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('36. Do you have a logo?')
    .setChoiceValues([
      'Yes — I will upload it in Section 7',
      'No'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('37. Provide up to 4 stats or numbers you are proud of')
    .setHelpText(
      'For each stat, use this format: NUMBER | SUFFIX | LABEL\n' +
      'Examples:\n' +
      '500 | + | Happy Clients\n' +
      '20 | + | Years in Business\n' +
      '4.9 | ★ | Average Rating\n' +
      '(optional) — leave blank to skip the stats section'
    )
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('38. List 4–6 short phrases that capture your brand\'s strengths')
    .setHelpText(
      'Keep each phrase 3–6 words. These appear in a scrolling banner strip on your homepage.\n' +
      'Examples: "Board-Certified Specialist", "Patient-Centered Care", "20 Years of Excellence", "Same-Day Appointments Available"'
    )
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('39. Do you have a FAQ you would like included on the site?')
    .setChoiceValues([
      'Yes — I will provide the questions and answers below',
      'No'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('40. If yes, paste your FAQ questions and answers here')
    .setHelpText('Format: Q: [question] / A: [answer] — one per line.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('41. Any awards, certifications, or affiliations to highlight?')
    .setHelpText('e.g. "Board Certified by the American Board of Dermatology", "Better Business Bureau A+ Rating"')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('42. Are there any important policies or info visitors should know before contacting you?')
    .setHelpText('e.g. insurance accepted, payment methods, service area restrictions, age requirements, cancellation policy')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('43. Do you have any downloadable documents or forms you want linked on the site?')
    .setHelpText('e.g. intake forms, brochures, menus, price lists. If yes, paste the URL(s) or note that you will upload them in Section 7.')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // SECTION 5 — Design & Aesthetic
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 5 — Design & Aesthetic')
    .setHelpText('These answers define your site\'s visual identity — colors, fonts, mood, and style.');

  form.addMultipleChoiceItem()
    .setTitle('44. Do you have existing brand colors?')
    .setChoiceValues([
      'Yes — I will provide hex codes below',
      'Yes — I will describe them below',
      'No — please choose colors for me'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('45. If yes, provide your brand color hex codes or description')
    .setHelpText('e.g. "#1a2b3c (navy), #c9963e (gold)" or "deep forest green and warm cream"')
    .setRequired(false);

  form.addCheckboxItem()
    .setTitle('46. What is the overall vibe you want? (pick up to 3)')
    .setChoiceValues([
      'Luxury & high-end',
      'Clean & minimal',
      'Warm & welcoming',
      'Bold & confident',
      'Soft & calming',
      'Professional & corporate',
      'Playful & energetic',
      'Earthy & natural'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('47. Paste up to 3 website URLs whose design you love')
    .setHelpText('Any industry is fine. Note what you love about each one. These are for design inspiration only — separate from your competitor list in Section 2.')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('48. Paste up to 3 website URLs whose design you dislike')
    .setHelpText('Note what you dislike about each one.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('49. What font style fits your brand?')
    .setChoiceValues([
      'Elegant serif — classic and refined (e.g. Playfair Display)',
      'Modern sans-serif — clean and minimal (e.g. Inter)',
      'Slab serif — bold and grounded (e.g. Merriweather)',
      'Not sure — you decide'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('50. How much animation do you want?')
    .setChoiceValues([
      'Subtle — gentle fades only',
      'Moderate — smooth reveals and transitions',
      'Bold — impressive motion, parallax, and scroll effects',
      'None'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('51. How much white space do you prefer?')
    .setChoiceValues([
      'Airy and spacious',
      'Dense and content-rich',
      'Somewhere in between'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('52. Any colors, styles, or looks you absolutely do NOT want?')
    .setHelpText('e.g. "no dark backgrounds", "no red", "nothing that looks like a generic template"')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // SECTION 6 — Features & Functionality
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 6 — Features & Functionality')
    .setHelpText('Every "yes" here is a component we build and wire up for you.');

  form.addMultipleChoiceItem()
    .setTitle('53. Do you want a contact form?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('54. Where should contact form submissions be sent? (email address)')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('55. Do you want an online booking/scheduling button?')
    .setChoiceValues([
      'Yes — I will provide the booking link below',
      'No'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('56. If yes, paste your booking link')
    .setHelpText('e.g. Calendly, Jane App, Acuity, Mindbody, OpenTable, etc.')
    .setRequired(false);

  form.addTextItem()
    .setTitle('57. What should your primary call-to-action button say?')
    .setHelpText('e.g. "Book Now", "Schedule a Consultation", "Get a Free Quote", "Call Us Today"')
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('58. Is this a solo practitioner/individual, or a team/group business?')
    .setChoiceValues([
      'Solo / just me',
      'Small team (2–5 people)',
      'Larger team or group'
    ])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('59. Do you want a live chat or FAQ chat widget on the site?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('60. If yes, list up to 8 common questions your customers ask — along with your preferred answers')
    .setHelpText('Format: Q: [question] / A: [answer] — one per line. These power the chat widget responses.')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('61. Do you want a reviews/testimonials carousel?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('62. Do you want an embedded Google Map?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('63. Do you want social media links in the header or footer?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addCheckboxItem()
    .setTitle('64. Which social platforms? (select all that apply)')
    .setChoiceValues([
      'Instagram',
      'Facebook',
      'LinkedIn',
      'TikTok',
      'YouTube',
      'X / Twitter',
      'Yelp',
      'Google Business'
    ])
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('65. Paste the full URL for each platform selected above (one per line)')
    .setHelpText('e.g.\ninstagram.com/yourbusiness\nfacebook.com/yourbusiness\nyelp.com/biz/your-business-name')
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('66. Do you want a photo gallery or before/after section?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('67. Do you want a newsletter signup?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addMultipleChoiceItem()
    .setTitle('68. Do you want an announcement bar at the top of the site?')
    .setChoiceValues(['Yes', 'No'])
    .setRequired(true);

  form.addTextItem()
    .setTitle('69. If yes, what should the announcement bar say?')
    .setHelpText('e.g. "Now accepting new patients — Call (555) 123-4567 to book"')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('70. Any other features you have seen on websites that you would want?')
    .setHelpText('Describe or paste a URL with a note about what you liked.')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // SECTION 7 — Assets & Technical
  // ─────────────────────────────────────────────
  form.addPageBreakItem()
    .setTitle('Section 7 — Assets & Technical')
    .setHelpText('The final section. Upload your files and provide domain/launch details.');

  form.addMultipleChoiceItem()
    .setTitle('71. Do you own a domain name already?')
    .setChoiceValues([
      'Yes — I own a domain',
      'No — I need help getting one'
    ])
    .setRequired(true);

  form.addTextItem()
    .setTitle('72. If yes, what is your domain name?')
    .setHelpText('e.g. yourpractice.com')
    .setRequired(false);

  form.addTextItem()
    .setTitle('73. Where is your domain registered?')
    .setHelpText('e.g. GoDaddy, Namecheap, Google Domains, Squarespace, etc.')
    .setRequired(false);

  // Note: Google Forms does not support file upload on all account types.
  // The following items use paragraph text as a fallback for file instructions.
  form.addParagraphTextItem()
    .setTitle('74. Logo file')
    .setHelpText(
      'Upload your logo (PNG or SVG preferred) using the file upload button below — OR email it to us at [YOUR EMAIL] with subject line "Logo — [Your Business Name]".\n' +
      'Type "uploaded" or "will email" here.'
    )
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('75. Photos')
    .setHelpText(
      'Upload photos of your business, space, team, or work using the file upload button — OR email them to us.\n' +
      'Type "uploaded", "will email", or "need stock photos" here.'
    )
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('76. Brand guidelines or style documents')
    .setHelpText(
      '(optional) Upload any brand guidelines, style guides, or existing marketing materials — OR email them to us.\n' +
      'Type "uploaded", "will email", or "none" here.'
    )
    .setRequired(false);

  form.addMultipleChoiceItem()
    .setTitle('77. Are there any pages or content from your existing site you want carried over?')
    .setChoiceValues([
      'Yes — I will describe below',
      'No'
    ])
    .setRequired(true);

  form.addParagraphTextItem()
    .setTitle('78. If yes, describe what to carry over from your existing site')
    .setRequired(false);

  form.addDateItem()
    .setTitle('79. When do you need the site live?')
    .setRequired(false);

  form.addParagraphTextItem()
    .setTitle('80. Anything else you want us to know before we start building?')
    .setHelpText('Extra context, special requests, things you are nervous about, questions for us — anything goes.')
    .setRequired(false);

  // ─────────────────────────────────────────────
  // OUTPUT URLS
  // ─────────────────────────────────────────────
  const editUrl = form.getEditUrl();
  const publishedUrl = form.getPublishedUrl();

  Logger.log('===========================================');
  Logger.log('FORM CREATED SUCCESSFULLY');
  Logger.log('===========================================');
  Logger.log('Edit URL (share with your team):');
  Logger.log(editUrl);
  Logger.log('');
  Logger.log('Response URL (send to clients):');
  Logger.log(publishedUrl);
  Logger.log('===========================================');
}
