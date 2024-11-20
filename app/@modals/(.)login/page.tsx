"use client"
import { Modal } from "@/components/modal"
import { CardWrapper } from "@/components/auth/card-wrapper"
import { LoginForm } from "@/components/auth/login-form"
import { ModalContext } from "@/lib/contexts/modal"

export default function LoginModal() {
  return (
    <ModalContext.Provider value={{ isModal: true }}>
      <Modal>
        <CardWrapper
          title="Login"
          headerLabel="Welcome back"
          backButtonLabel="Don't have an account?"
          backButtonHref="/register"
          showSocial
        >
          <LoginForm />
        </CardWrapper>
      </Modal>
    </ModalContext.Provider>
  )
}
