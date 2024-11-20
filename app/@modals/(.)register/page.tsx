"use client"
import { Modal } from "@/components/modal"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { RegisterForm } from "@/components/auth/register-form"
import { ModalContext } from "@/lib/contexts/modal"

export default function RegisterModal() {
  return (
    <ModalContext.Provider value={{ isModal: true }}>
      <Modal>
        <CardWrapper
          title="Register"
          headerLabel="Create an account"
          backButtonLabel="Already have an account?"
          backButtonHref="/login"
          showSocial
        >
          <RegisterForm />
        </CardWrapper>
      </Modal>
    </ModalContext.Provider>
  )
}
