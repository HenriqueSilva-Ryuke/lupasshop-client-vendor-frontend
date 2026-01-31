'use client';

import { useSellerMultiStepRegisterForm } from '@/hooks/forms/useSellerMultiStepRegisterForm';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export function SellerMultiStepRegisterForm() {
 const t = useTranslations();
 const {
 form,
 currentStep,
 handleNextStep,
 handlePreviousStep,
 handleSubmit,
 handleFileUpload,
 handleMultipleFileUpload,
 showPassword,
 showConfirmPassword,
 togglePasswordVisibility,
 toggleConfirmPasswordVisibility,
 isLoading,
 error,
 uploadedFiles,
 } = useSellerMultiStepRegisterForm();

 const {
 register,
 formState: { errors },
 watch,
 } = form;

 const alvaraRef = useRef<HTMLInputElement>(null);
 const licencaRef = useRef<HTMLInputElement>(null);
 const localizacaoRef = useRef<HTMLInputElement>(null);
 const logotipoRef = useRef<HTMLInputElement>(null);
 const capaRef = useRef<HTMLInputElement>(null);
 const espacoRef = useRef<HTMLInputElement>(null);

 const progressPercentage = (currentStep / 4) * 100;

 return (
 <form onSubmit={handleSubmit} className="bg-card bg-[#1a2632] p-8 rounded-xl border border-[#e5e7eb] border-border shadow-sm flex flex-col gap-6">
 {/* Progress Bar */}
 <div className="flex flex-col gap-3 mb-4">
 <div className="flex items-center justify-between">
 <span className="text-primary font-bold text-sm uppercase tracking-wide">
 Passo {currentStep} de 4
 </span>
 <span className="text-secondary-text text-sm">
 {currentStep === 1 && 'Dados do Responsável'}
 {currentStep === 2 && 'Dados da Empresa'}
 {currentStep === 3 && 'Documentos'}
 {currentStep === 4 && 'Imagens'}
 </span>
 </div>
 <div className="w-full bg-[#f0f3f4] rounded-full h-2.5">
 <div
 className="bg-primary h-2.5 rounded-full transition-all duration-500"
 style={{ width: `${progressPercentage}%` }}
 />
 </div>
 </div>

 {/* Error Message */}
 {error && (
 <div className="p-4 bg-destructive/10 bg-red-900/20 border border-destructive border-red-800 rounded-lg">
 <p className="text-sm text-red-700 text-red-400">{error}</p>
 </div>
 )}

 {/* Step 1: Dados do Responsável */}
 {currentStep === 1 && (
 <div className="flex flex-col gap-6">
 <div>
 <h3 className="text-lg font-bold text-foreground text-card-foreground mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">person</span>
 Dados do Responsável
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 Informações do responsável legal pela loja
 </p>
 </div>

 {/* Full Name */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="fullName">
 Nome Completo
 </label>
 <input
 {...register('fullName')}
 id="fullName"
 placeholder="Seu nome completo"
 type="text"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.fullName && (
 <span className="text-xs text-destructive text-red-400">{errors.fullName.message}</span>
 )}
 </div>

 {/* Email */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="email">
 E-mail
 </label>
 <input
 {...register('email')}
 id="email"
 placeholder="seu@email.com"
 type="email"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.email && (
 <span className="text-xs text-destructive text-red-400">{errors.email.message}</span>
 )}
 </div>

 {/* Password */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="password">
 Senha
 </label>
 <div className="relative">
 <input
 {...register('password')}
 id="password"
 placeholder="Mínimo 6 caracteres"
 type={showPassword ? 'text' : 'password'}
 className="w-full h-12 px-4 pr-12 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 <button
 type="button"
 onClick={togglePasswordVisibility}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary transition-colors"
 >
 <span className="material-symbols-outlined">
 {showPassword ? 'visibility' : 'visibility_off'}
 </span>
 </button>
 </div>
 {errors.password && (
 <span className="text-xs text-destructive text-red-400">{errors.password.message}</span>
 )}
 </div>

 {/* Confirm Password */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="confirmPassword">
 Confirmar Senha
 </label>
 <div className="relative">
 <input
 {...register('confirmPassword')}
 id="confirmPassword"
 placeholder="Repita a senha"
 type={showConfirmPassword ? 'text' : 'password'}
 className="w-full h-12 px-4 pr-12 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 <button
 type="button"
 onClick={toggleConfirmPasswordVisibility}
 className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary-text hover:text-primary transition-colors"
 >
 <span className="material-symbols-outlined">
 {showConfirmPassword ? 'visibility' : 'visibility_off'}
 </span>
 </button>
 </div>
 {errors.confirmPassword && (
 <span className="text-xs text-destructive text-red-400">{errors.confirmPassword.message}</span>
 )}
 </div>
 </div>
 )}

 {/* Step 2: Dados da Empresa */}
 {currentStep === 2 && (
 <div className="flex flex-col gap-6">
 <div>
 <h3 className="text-lg font-bold text-foreground text-card-foreground mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">domain</span>
 Dados da Empresa
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 Informações sobre sua empresa e categoria de negócio
 </p>
 </div>

 {/* NIF */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="nif">
 NIF (Número de Identificação Fiscal)
 </label>
 <input
 {...register('nif')}
 id="nif"
 placeholder="000.000.000 XXX"
 type="text"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.nif && (
 <span className="text-xs text-destructive text-red-400">{errors.nif.message}</span>
 )}
 </div>

 {/* Razão Social */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="razaoSocial">
 Razão Social
 </label>
 <input
 {...register('razaoSocial')}
 id="razaoSocial"
 placeholder="Nome jurídico da empresa"
 type="text"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.razaoSocial && (
 <span className="text-xs text-destructive text-red-400">{errors.razaoSocial.message}</span>
 )}
 </div>

 {/* Nome Fantasia */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="nomeFantasia">
 Nome da Loja (Fantasia)
 </label>
 <input
 {...register('nomeFantasia')}
 id="nomeFantasia"
 placeholder="Como os clientes verão sua loja"
 type="text"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
 />
 {errors.nomeFantasia && (
 <span className="text-xs text-destructive text-red-400">{errors.nomeFantasia.message}</span>
 )}
 </div>

 {/* Category */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="category">
 Categoria Principal
 </label>
 <div className="relative">
 <select
 {...register('category')}
 id="category"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
 >
 <option value="">Selecione uma categoria</option>
 <option value="moda">Moda e Vestuário</option>
 <option value="eletronicos">Eletrônicos</option>
 <option value="casa">Casa e Decoração</option>
 <option value="alimentos">Alimentos e Bebidas</option>
 <option value="beleza">Beleza e Cuidados</option>
 <option value="esportes">Esportes e Fitness</option>
 <option value="outro">Outro</option>
 </select>
 <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-secondary-text">
 <span className="material-symbols-outlined">expand_more</span>
 </div>
 </div>
 {errors.category && (
 <span className="text-xs text-destructive text-red-400">{errors.category.message}</span>
 )}
 </div>
 </div>
 )}

 {/* Step 3: Documentos */}
 {currentStep === 3 && (
 <div className="flex flex-col gap-6">
 <div>
 <h3 className="text-lg font-bold text-foreground text-card-foreground mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">description</span>
 Documentos
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 Upload dos documentos necessários para validação
 </p>
 </div>

 {/* Alvará Comercial */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="alvara">
 Alvará Comercial
 </label>
 <input
 ref={alvaraRef}
 type="file"
 accept="image/*,.pdf"
 onChange={(e) => {
 if (e.target.files?.[0]) {
 handleFileUpload('alvaraComercial', e.target.files[0]);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => alvaraRef.current?.click()}
 className="h-12 px-4 rounded-lg border-2 border-dashed bg-card text-foreground text-card-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">cloud_upload</span>
 {uploadedFiles.alvaraComercial && uploadedFiles.alvaraComercial instanceof File ? uploadedFiles.alvaraComercial.name : 'Selecione arquivo'}
 </button>
 {errors.alvaraComercial && (
 <span className="text-xs text-destructive text-red-400">{errors.alvaraComercial.message as string}</span>
 )}
 </div>

 {/* Licença de Venda */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="licenca">
 Licença de Venda
 </label>
 <input
 ref={licencaRef}
 type="file"
 accept="image/*,.pdf"
 onChange={(e) => {
 if (e.target.files?.[0]) {
 handleFileUpload('licencaVenda', e.target.files[0]);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => licencaRef.current?.click()}
 className="h-12 px-4 rounded-lg border-2 border-dashed bg-card text-foreground text-card-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">cloud_upload</span>
 {uploadedFiles.licencaVenda && uploadedFiles.licencaVenda instanceof File ? uploadedFiles.licencaVenda.name : 'Selecione arquivo'}
 </button>
 {errors.licencaVenda && (
 <span className="text-xs text-destructive text-red-400">{errors.licencaVenda.message as string}</span>
 )}
 </div>

 {/* Localização Física */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="localizacao">
 Localização do Espaço Físico
 </label>
 <input
 ref={localizacaoRef}
 type="file"
 accept="image/*"
 onChange={(e) => {
 if (e.target.files?.[0]) {
 handleFileUpload('localizacaoFisica', e.target.files[0]);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => localizacaoRef.current?.click()}
 className="h-12 px-4 rounded-lg border-2 border-dashed bg-card text-foreground text-card-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">cloud_upload</span>
 {uploadedFiles.localizacaoFisica && uploadedFiles.localizacaoFisica instanceof File ? uploadedFiles.localizacaoFisica.name : 'Selecione arquivo'}
 </button>
 {errors.localizacaoFisica && (
 <span className="text-xs text-destructive text-red-400">{errors.localizacaoFisica.message as string}</span>
 )}
 </div>
 </div>
 )}

 {/* Step 4: Imagens */}
 {currentStep === 4 && (
 <div className="flex flex-col gap-6">
 <div>
 <h3 className="text-lg font-bold text-foreground text-card-foreground mb-4 flex items-center gap-2">
 <span className="material-symbols-outlined text-primary">image</span>
 Imagens da Loja
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 Logo, capa e fotos do espaço físico
 </p>
 </div>

 {/* Logotipo */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="logo">
 Logotipo (PNG, JPG)
 </label>
 <input
 ref={logotipoRef}
 type="file"
 accept="image/*"
 onChange={(e) => {
 if (e.target.files?.[0]) {
 handleFileUpload('logotipo', e.target.files[0]);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => logotipoRef.current?.click()}
 className="h-12 px-4 rounded-lg border-2 border-dashed bg-card text-foreground text-card-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">cloud_upload</span>
 {uploadedFiles.logotipo && uploadedFiles.logotipo instanceof File ? uploadedFiles.logotipo.name : 'Selecione arquivo'}
 </button>
 {errors.logotipo && (
 <span className="text-xs text-destructive text-red-400">{errors.logotipo.message as string}</span>
 )}
 </div>

 {/* Imagem de Capa */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="capa">
 Imagem de Capa (PNG, JPG)
 </label>
 <input
 ref={capaRef}
 type="file"
 accept="image/*"
 onChange={(e) => {
 if (e.target.files?.[0]) {
 handleFileUpload('imagemCapa', e.target.files[0]);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => capaRef.current?.click()}
 className="h-12 px-4 rounded-lg border-2 border-dashed bg-card text-foreground text-card-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">cloud_upload</span>
 {uploadedFiles.imagemCapa && uploadedFiles.imagemCapa instanceof File ? uploadedFiles.imagemCapa.name : 'Selecione arquivo'}
 </button>
 {errors.imagemCapa && (
 <span className="text-xs text-destructive text-red-400">{errors.imagemCapa.message as string}</span>
 )}
 </div>

 {/* Fotos do Espaço */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="espaco">
 Fotos do Espaço Físico (múltiplas)
 </label>
 <input
 ref={espacoRef}
 type="file"
 accept="image/*"
 multiple
 onChange={(e) => {
 if (e.target.files?.length) {
 handleMultipleFileUpload('fotosEspaco', e.target.files);
 }
 }}
 className="hidden"
 />
 <button
 type="button"
 onClick={() => espacoRef.current?.click()}
 className="h-12 px-4 rounded-lg border-2 border-dashed bg-card text-foreground text-card-foreground hover:border-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 >
 <span className="material-symbols-outlined">cloud_upload</span>
 {uploadedFiles.fotosEspaco && Array.isArray(uploadedFiles.fotosEspaco) && uploadedFiles.fotosEspaco.length > 0
 ? `${uploadedFiles.fotosEspaco.length} arquivo(s)`
 : 'Selecione arquivos'}
 </button>
 {errors.fotosEspaco && (
 <span className="text-xs text-destructive text-red-400">{errors.fotosEspaco.message as string}</span>
 )}
 </div>
 </div>
 )}

 {/* Navigation Buttons */}
 <div className="flex gap-4 pt-4">
 {currentStep > 1 && (
 <button
 type="button"
 onClick={handlePreviousStep}
 className="flex-1 h-14 rounded-lg border-2 border-primary text-primary font-bold hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
 disabled={isLoading}
 >
 <span className="material-symbols-outlined">arrow_back</span>
 Voltar
 </button>
 )}
 {currentStep < 4 ? (
 <button
 type="button"
 onClick={handleNextStep}
 className="flex-1 h-14 rounded-lg bg-primary hover:bg-primary-dark text-card-foreground font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
 disabled={isLoading}
 >
 Próximo
 <span className="material-symbols-outlined">arrow_forward</span>
 </button>
 ) : (
 <button
 type="submit"
 className="flex-1 h-14 rounded-lg bg-primary hover:bg-primary-dark text-card-foreground font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
 disabled={isLoading}
 >
 {isLoading ? 'Criando conta...' : 'Finalizar Cadastro'}
 <span className="material-symbols-outlined">check_circle</span>
 </button>
 )}
 </div>
 </form>
 );
}
