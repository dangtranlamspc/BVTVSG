export const htmlToText = (html: string): string => {
    if (!html) return '';
  
    // Remove script and style tags and their contents
    let text = html.replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '');
  
    // Replace common HTML entities
    const entities: { [key: string]: string } = {
      '&nbsp;': ' ',
      '&amp;': '&',
      '&quot;': '"',
      '&lt;': '<',
      '&gt;': '>',
      '&apos;': "'",
      '&#x2F;': '/',
      '&#x27;': "'",
      '&#39;': "'",
      '&#47;': '/',
    };
  
    text = text.replace(/&[#A-Za-z0-9]+;/gi, (entity) => {
      return entities[entity] || entity;
    });
  
    // Replace <br> and <p> tags with newlines
    text = text.replace(/<br\s*\/?>/gi, '\n');
    text = text.replace(/<p\s*\/?>/gi, '\n');
  
    // Remove remaining HTML tags
    text = text.replace(/<[^>]+>/g, '');
  
    // Trim whitespace and remove extra newlines
    text = text.replace(/\s+/g, ' ').trim();
    text = text.replace(/\n\s*\n/g, '\n');
  
    return text;
  };