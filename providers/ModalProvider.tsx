import React, { createContext, useState, useContext, PropsWithChildren } from 'react';
import { useRouter } from 'next/router';

interface Context {
	openTermsModal: () => void;
	closeTermsModal: () => void;
	setIsTermsAccepted: (value: boolean) => void;
	setIsModalOpen: (value: boolean) => void;
	isModalOpen: boolean;
	isTermsAccepted: boolean;
}


const TermsModalContext = createContext<Context>({
	openTermsModal: () => {},
	closeTermsModal: () => {},
	setIsTermsAccepted: () => {},
	setIsModalOpen: () => {},
	isModalOpen: false,
	isTermsAccepted: false,
});

export const TermsModalProvider = ({ children }: PropsWithChildren) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
	const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const router = useRouter()
	

  const openTermsModal = () => {
    setIsModalOpen(true);
  };

  const closeTermsModal = () => {
    setIsModalOpen(false);
		router.push('/')
  };

  return (
    <TermsModalContext.Provider value={{ openTermsModal, closeTermsModal, isTermsAccepted, setIsTermsAccepted, isModalOpen, setIsModalOpen }}>
      {children}
    </TermsModalContext.Provider>
  );
};

// Hook para facilitar o acesso ao contexto
export const useTermsModal = () => useContext(TermsModalContext);
