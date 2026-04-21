import { useAuth } from '../../context/AuthContext';

const { token } = useAuth();

const handleUpload = async () => {
  if (!selectedFile) return;
  setUploading(true);
  try {
    const formData = new FormData();
    formData.append('file', {
      uri: selectedFile.uri,
      type: 'application/pdf',
      name: selectedFile.name,
    } as any);

    const response = await fetch(
      'https://cvapiappservice-dng8e8gmh0hvdbcr.francecentral-01.azurewebsites.net/api/cv/upload',
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      }
    );

    const contentType = response.headers.get('content-type');
    const data = contentType?.includes('application/json')
      ? await response.json()
      : await response.text();

    if (!response.ok) {
      throw new Error(typeof data === 'string' ? data : data.message || 'Upload failed');
    }

    onUploadCV(selectedFile);
    setUploadModal(false);
    setSelectedFile(null);
    Alert.alert('Success', 'CV uploaded successfully!');
  } catch (error: any) {
    Alert.alert('Error', error.message || t('home.errorUpload'));
  } finally {
    setUploading(false);
  }
};