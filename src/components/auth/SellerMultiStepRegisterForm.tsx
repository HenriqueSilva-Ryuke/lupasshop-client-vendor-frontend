'use client';

import { useSellerMultiStepRegisterForm } from '@/hooks/forms/useSellerMultiStepRegisterForm';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

export function SellerMultiStepRegisterForm() {
 const t = useTranslations('auth.register.seller');
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

 const stepTitles = [
  t('step1Title'),
  t('step2Title'),
  t('step3Title'),
  t('step4Title'),
 ];

 return (
 <form onSubmit={handleSubmit} className="bg-card bg-[#1a2632] p-8 rounded-xl border border-[#e5e7eb] border-border shadow-sm flex flex-col gap-6">
 {/* Progress Bar */}
 <div className="flex flex-col gap-3 mb-4">
 <div className="flex items-center justify-between">
 <span className="text-primary font-bold text-sm uppercase tracking-wide">
 {t('step')} {currentStep} {t('of')} 4
 </span>
 <span className="text-secondary-text text-sm">
 {stepTitles[currentStep - 1]}
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
 {t('step1Title')}
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 {t('step1Subtitle')}
 </p>
 </div>

 {/* Full Name */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="fullName">
 {t('fullName')}
 </label>
 <input
 {...register('fullName')}
 id="fullName"
 placeholder={t('fullNamePlaceholder')}
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
 {t('email')}
 </label>
 <input
 {...register('email')}
 id="email"
 placeholder={t('emailPlaceholder')}
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
 {t('password')}
 </label>
 <div className="relative">
 <input
 {...register('password')}
 id="password"
 placeholder={t('passwordPlaceholder')}
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
 {t('confirmPassword')}
 </label>
 <div className="relative">
 <input
 {...register('confirmPassword')}
 id="confirmPassword"
 placeholder={t('confirmPasswordPlaceholder')}
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
 {t('step2Title')}
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 {t('step2Subtitle')}
 </p>
 </div>

 {/* NIF */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="nif">
 {t('nif')}
 </label>
 <input
 {...register('nif')}
 id="nif"
 placeholder={t('nifPlaceholder')}
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
 {t('razaoSocial')}
 </label>
 <input
 {...register('razaoSocial')}
 id="razaoSocial"
 placeholder={t('razaoSocialPlaceholder')}
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
 {t('nomeFantasia')}
 </label>
 <input
 {...register('nomeFantasia')}
 id="nomeFantasia"
 placeholder={t('nomeFantasiaPlaceholder')}
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
 {t('category')}
 </label>
 <div className="relative">
 <select
 {...register('category')}
 id="category"
 className="w-full h-12 px-4 rounded-lg border bg-card text-foreground text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all appearance-none"
 >
 <option value="">{t('categoryPlaceholder')}</option>
 <option value="moda">{t('categories.moda')}</option>
 <option value="eletronicos">{t('categories.eletronicos')}</option>
 <option value="casa">{t('categories.casa')}</option>
 <option value="alimentos">{t('categories.alimentos')}</option>
 <option value="beleza">{t('categories.beleza')}</option>
 <option value="esportes">{t('categories.esportes')}</option>
 <option value="outro">{t('categories.outro')}</option>
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
 {t('step3Title')}
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 {t('step3Subtitle')}
 </p>
 </div>

 {/* Alvará Comercial */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="alvara">
 {t('alvara')}
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
 {uploadedFiles.alvaraComercial && uploadedFiles.alvaraComercial instanceof File ? uploadedFiles.alvaraComercial.name : t('alvara')}
 </button>
 {errors.alvaraComercial && (
 <span className="text-xs text-destructive text-red-400">{errors.alvaraComercial.message as string}</span>
 )}
 </div>

 {/* Licença de Venda */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="licenca">
 {t('licenca')}
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
 {uploadedFiles.licencaVenda && uploadedFiles.licencaVenda instanceof File ? uploadedFiles.licencaVenda.name : t('licenca')}
 </button>
 {errors.licencaVenda && (
 <span className="text-xs text-destructive text-red-400">{errors.licencaVenda.message as string}</span>
 )}
 </div>

 {/* Localização Física */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="localizacao">
 {t('localizacao')}
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
 {uploadedFiles.localizacaoFisica && uploadedFiles.localizacaoFisica instanceof File ? uploadedFiles.localizacaoFisica.name : t('localizacao')}
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
 {t('step4Title')}
 </h3>
 <p className="text-sm text-secondary-text mb-4">
 {t('step4Subtitle')}
 </p>
 </div>

 {/* Logotipo */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="logo">
 {t('logo')}
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
 {uploadedFiles.logotipo && uploadedFiles.logotipo instanceof File ? uploadedFiles.logotipo.name : t('logo')}
 </button>
 {errors.logotipo && (
 <span className="text-xs text-destructive text-red-400">{errors.logotipo.message as string}</span>
 )}
 </div>

 {/* Imagem de Capa */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="capa">
 {t('capa')}
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
 {uploadedFiles.imagemCapa && uploadedFiles.imagemCapa instanceof File ? uploadedFiles.imagemCapa.name : t('capa')}
 </button>
 {errors.imagemCapa && (
 <span className="text-xs text-destructive text-red-400">{errors.imagemCapa.message as string}</span>
 )}
 </div>

 {/* Fotos do Espaço */}
 <div className="flex flex-col gap-1.5">
 <label className="text-sm font-medium text-foreground" htmlFor="espaco">
 {t('espaco')}
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
 ? `${uploadedFiles.fotosEspaco.length} ${t('espaco')}`
 : t('espaco')}
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
 {t('previous')}
 </button>
 )}
 {currentStep < 4 ? (
 <button
 type="button"
 onClick={handleNextStep}
 className="flex-1 h-14 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
 disabled={isLoading}
 >
 {t('next')}
 <span className="material-symbols-outlined">arrow_forward</span>
 </button>
 ) : (
 <button
 type="submit"
 className="flex-1 h-14 rounded-lg bg-primary hover:bg-primary-dark text-white font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
 disabled={isLoading}
 >
 {isLoading ? t('loadingSubmit') : t('submit')}
 <span className="material-symbols-outlined">check_circle</span>
 </button>
 )}
 </div>
 </form>
 );
}
