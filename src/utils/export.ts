import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const exportAsPNG = async (
  element: HTMLElement,
  filename: string = 'badge.png'
) => {
  try {
    // Temporarily make the element visible for capture
    const originalStyle = {
      opacity: element.style.opacity,
      zIndex: element.style.zIndex,
      position: element.style.position,
    };

    // Make visible temporarily
    element.style.opacity = '1';
    element.style.zIndex = '9999';
    element.style.position = 'fixed';

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      backgroundColor: '#f3f4f6',
      scale: 1,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: 1000,
      height: 1000,
    });

    // Restore original styles
    element.style.opacity = originalStyle.opacity;
    element.style.zIndex = originalStyle.zIndex;
    element.style.position = originalStyle.position;

    // Create download link
    const link = document.createElement('a');
    link.download = filename;
    link.href = canvas.toDataURL('image/png');
    link.click();
  } catch (error) {
    console.error("Echec de l'exportation");
    throw new Error("Echec de l'exportation");
  }
};

export const exportAsPDF = async (
  element: HTMLElement,
  filename: string = 'badge.pdf'
) => {
  try {
    // Temporarily make the element visible for capture
    const originalStyle = {
      opacity: element.style.opacity,
      zIndex: element.style.zIndex,
      position: element.style.position,
    };

    // Make visible temporarily
    element.style.opacity = '1';
    element.style.zIndex = '9999';
    element.style.position = 'fixed';

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 500));

    const canvas = await html2canvas(element, {
      backgroundColor: '#f3f4f6',
      scale: 1,
      logging: false,
      useCORS: true,
      allowTaint: true,
      width: 1000,
      height: 1000,
    });

    // Restore original styles
    element.style.opacity = originalStyle.opacity;
    element.style.zIndex = originalStyle.zIndex;
    element.style.position = originalStyle.position;

    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [1000, 1000],
    });

    pdf.addImage(imgData, 'PNG', 0, 0, 1000, 1000);
    pdf.save(filename);
  } catch (error) {
    console.error("Echec de l'exportation");
    throw new Error("Echec de l'exportation");
  }
};
