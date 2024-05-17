import { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";

export default function UploadProfileImage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true); // Set isLoading to true before making the request
      const formData = new FormData();
      formData.append("file", selectedFile);
      const response = await axios.post("http://ec2-16-170-228-249.eu-north-1.compute.amazonaws.com:3000/api/v1/users/uploadProfilePicture", formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Upload response:", response);
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setIsLoading(false); // Set isLoading to false after the request is completed
      setSelectedFile(null); // Clear the selected file
      onClose(); // Close the modal
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="secondary" variant="flat">
        Upload Profile Image
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onClose} placement="top-center">
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Upload Profile Image</ModalHeader>
              <ModalBody>
                <input
                  type="file"
                  onChange={handleFileChange}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleUpload} isLoading={isLoading}>
                  Upload
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
