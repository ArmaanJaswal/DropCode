export const downloadReceivedFile = (chunks, mimeType, fileName) => {
  const blob = new Blob(chunks, {
    type: mimeType,
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);
  link.click();
  link.remove();

  URL.revokeObjectURL(url);
  console.log("Download started");
};
