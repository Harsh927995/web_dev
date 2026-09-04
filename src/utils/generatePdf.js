export async function generateResourcePDF(item) {
  if (!item) return;

  const { jsPDF } = await import('jspdf');

  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 16;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  const checkPageBreak = (neededHeight) => {
    if (y + neededHeight > pageHeight - 16) {
      doc.addPage();
      y = margin;
      drawHeader();
    }
  };

  const drawHeader = () => {
    doc.setFillColor(59, 130, 246); // Brand Accent Blue
    doc.rect(margin, 8, contentWidth, 1.2, 'F');
  };

  drawHeader();
  y = 15;

  // Header Branding
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(59, 130, 246);
  doc.text('KHOJE KHATAM  •  ENGINEERING STUDY PORTAL', margin, y);
  y += 7;

  // Document Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(15, 23, 42); // Dark slate
  const splitTitle = doc.splitTextToSize(item.title, contentWidth);
  doc.text(splitTitle, margin, y);
  y += splitTitle.length * 6 + 2;

  // Metadata Line
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(100, 116, 139);
  const metaText = `Subject: ${item.subject}   |   Branch: ${item.branch}   |   Semester: ${item.semester || 'N/A'}   |   Year: ${item.year}   |   Type: ${item.type}`;
  doc.text(metaText, margin, y);
  y += 5.5;

  // Divider line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 7;

  // Section 1: Questions & Core Material
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(30, 41, 59);
  doc.text('1. Examination Questions & Core Material', margin, y);
  y += 6;

  // Questions Content
  doc.setFont('courier', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(30, 41, 59);

  const lines = item.content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    if (!rawLine.trim()) {
      y += 2.5;
      checkPageBreak(5);
      continue;
    }

    const wrapped = doc.splitTextToSize(rawLine, contentWidth);
    for (let j = 0; j < wrapped.length; j++) {
      checkPageBreak(4.5);
      doc.text(wrapped[j], margin, y);
      y += 4;
    }
  }

  // Section 2: Exam Tips & Solutions
  if (item.notes) {
    y += 4;
    checkPageBreak(25);

    doc.setDrawColor(203, 213, 225);
    doc.line(margin, y, pageWidth - margin, y);
    y += 6;

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(14, 116, 144);
    doc.text('2. Exam Tips, Important Formulas & Model Solutions', margin, y);
    y += 6;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(51, 65, 85);

    const noteLines = item.notes.split('\n');
    for (let k = 0; k < noteLines.length; k++) {
      const nLine = noteLines[k];
      if (!nLine.trim()) {
        y += 2.5;
        checkPageBreak(5);
        continue;
      }
      const wrappedNotes = doc.splitTextToSize(nLine, contentWidth);
      for (let l = 0; l < wrappedNotes.length; l++) {
        checkPageBreak(4.5);
        doc.text(wrappedNotes[l], margin, y);
        y += 4.2;
      }
    }
  }

  // Numbered Footers on every page
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(148, 163, 184);

    doc.setDrawColor(226, 232, 240);
    doc.line(margin, pageHeight - 11, pageWidth - margin, pageHeight - 11);

    doc.text('Khoje Khatam - B.Tech Study Portal (https://harsh927995.github.io/web_dev/)', margin, pageHeight - 7);
    doc.text(`Page ${p} of ${totalPages}`, pageWidth - margin, pageHeight - 7, { align: 'right' });
  }

  const filename = `${(item.id || 'question-paper').replace(/[^a-zA-Z0-9-_]/g, '_')}.pdf`;
  doc.save(filename);
}
