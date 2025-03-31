import React, { useState, useEffect } from 'react';
import documentService from './documentService';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle, 
  AlertDialogTrigger 
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';

const KnowledgeBase = () => {
  const [documents, setDocuments] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [documentName, setDocumentName] = useState('');

  // Fetch documents on component mount
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const docs = await documentService.getAllDocuments();
      setDocuments(docs);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch documents",
        variant: "destructive"
      });
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      toast({
        title: "Error",
        description: "Please select a file",
        variant: "destructive"
      });
      return;
    }

    try {
      await documentService.uploadDocument(selectedFile, documentName);
      toast({
        title: "Success",
        description: "Document uploaded successfully"
      });
      fetchDocuments(); // Refresh document list
      setSelectedFile(null);
      setDocumentName('');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload document",
        variant: "destructive"
      });
    }
  };

  const handleDeleteDocument = async (docId) => {
    try {
      await documentService.deleteDocument(docId);
      toast({
        title: "Success",
        description: "Document deleted successfully"
      });
      fetchDocuments(); // Refresh document list
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive"
      });
    }
  };

  return (
    
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Knowledge Base Management</CardTitle>
        
      </CardHeader>
      <CardContent>
        {/* Document Upload Section */}
        <form onSubmit={handleFileUpload} className="mb-6">
          <div className="flex space-x-4">
            <Input 
              type="file" 
              onChange={(e) => setSelectedFile(e.target.files[0])}
              className="flex-grow"
            />
            <Input 
              type="text" 
              placeholder="Document Name" 
              value={documentName}
              onChange={(e) => setDocumentName(e.target.value)}
              className="flex-grow"
            />
            <Button type="submit">Upload</Button>
          </div>
        </form>

        {/* Documents Table */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Filename</TableHead>
              <TableHead>Domain</TableHead>
              <TableHead>Upload Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {documents.map((doc) => (
              <TableRow key={doc.id}>
                <TableCell>{doc.filename}</TableCell>
                <TableCell>{doc.domain}</TableCell>
                <TableCell>{new Date(doc.upload_date).toLocaleString()}</TableCell>
                <TableCell>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive">Delete</Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete the document and its embeddings.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction 
                          onClick={() => handleDeleteDocument(doc.id)}
                        >
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default KnowledgeBase;