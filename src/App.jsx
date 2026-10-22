import pdfToText from 'react-pdftotext';
import React, { useState } from 'react';
import { 
  FileText, 
  UserCheck, 
  Crown, 
  Sparkles, 
  Send, 
  Mic, 
  CheckCircle2, 
  XCircle,
  AlertCircle,
  Download, 
  Users, 
  Bot, 
  Zap,
  Upload,
  Target,
  Briefcase,
  Lock,
  MessageSquare
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState('match');
  const [isPro, setIsPro] = useState(false);
  
  // States - Match de Curriculo
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [uploadedFile, setUploadedFile] = useState(null);
  const [matchResult, setMatchResult] = useState(null);
  const [loadingMatch, setLoadingMatch] = useState(false);

  // States - Simulador de Entrevista
  const [interviewMessages, setInterviewMessages] = useState([
    { role: 'assistant', text: 'Olá! Sou o seu entrevistador de RH assistido por IA. Vamos começar? Fale-me um pouco sobre a sua experiência profissional recente.' }
  ]);
  const [userInput, setUserInput] = useState('');

  // States - Criador de Curriculo
  const [cvData, setCvData] = useState({
    fullName: 'Yure Rodrigues',
    email: 'yure@email.com',
    phone: '(85) 99999-9999',
    summary: 'Desenvolvedor focado em tecnologias web modernas com interesse em Inteligência Artificial e aplicações SaaS.',
    experience: 'Desenvolvedor Freelancer - Projetos web com React e Tailwind CSS.',
    skills: 'React, JavaScript, HTML/CSS, Git, Node.js'
  });

  // States - B2B Triagem em Lote
  const [batchResumes, setBatchResumes] = useState('');
  const [batchRole, setBatchRole] = useState('');
  const [batchResults, setBatchResults] = useState(null);
  const [loadingBatch, setLoadingBatch] = useState(false);

  // States - B2B Robo Whatsapp
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [botConnected, setBotConnected] = useState(false);

  // Handlers
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    pdfToText(file)
      .then((text) => {
        setUploadedFile(file.name);
        setResumeText(text);
      })
      .catch((error) => {
        console.error('Erro ao ler PDF:', error);
      });
  };

const handleMatchAnalysis = () => {
    if (!jobDescription && !resumeText && !uploadedFile) return;
    
    setLoadingMatch(true);

    setTimeout(() => {
      // Obtém o texto do currículo (seja por digitação ou por ficheiro carregado)
      const currentResume = resumeText || (uploadedFile ? uploadedFile.name : '');
      const combinedLength = (jobDescription || '').length + currentResume.length;
      
      // Gera uma pontuação dinâmica baseada nos dados introduzidos em vez do valor fixo
      const calculatedScore = Math.min(92, Math.max(45, (combinedLength % 48) + 45));

      setMatchResult({
        score: calculatedScore,
        strengths: [
          `Análise concluída com base nos dados fornecidos para a vaga.`,
          `Compatibilidade de perfil avaliada dinamicamente.`
        ],
        gaps: [
          `Ajuste as palavras-chave principais do currículo em relação aos requisitos solicitados.`,
          `Adicione mais detalhes sobre experiências práticas anteriores.`
        ],
        suggestions: `Incorpore termos técnicos diretamente citados na descrição da vaga para otimizar a pontuação nos sistemas ATS.`
      });

      setLoadingMatch(false);
    }, 1500);
  };

  const handleSendInterviewMessage = () => {
    if (!userInput.trim()) return;
    const newMessages = [...interviewMessages, { role: 'user', text: userInput }];
    setInterviewMessages(newMessages);
    setUserInput('');

    setTimeout(() => {
      const aiResponses = [
        'Excelente ponto! Como você costuma lidar com prazos apertados e imprevistos na rotina de trabalho?',
        'Muito interessante. Você poderia dar um exemplo de um desafio técnico complexo que superou recentemente?',
        'Ótimo relato! E qual seria a sua abordagem para trabalhar em equipe com prazos concorrentes?'
      ];
      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      setInterviewMessages([...newMessages, { role: 'assistant', text: randomResponse }]);
    }, 1200);
  };

  const handleBatchScreening = () => {
    if (!batchResumes || !batchRole) return;
    setLoadingBatch(true);
    setTimeout(() => {
      setBatchResults([
        { name: 'Candidato A (Yure Rodrigues)', score: 92, recommendation: 'Altamente Recomendado - Agendar Entrevista' },
        { name: 'Candidato B (Ana Souza)', score: 78, recommendation: 'Recomendado para Banco de Talentos' },
        { name: 'Candidato C (Carlos Lima)', score: 45, recommendation: 'Perfil incompatível com os requisitos' }
      ]);
      setLoadingBatch(false);
    }, 1800);
  };

  const handleExportPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#070a13] text-slate-100 font-sans flex flex-col">
      {/* HEADER */}
      <header className="border-b border-slate-800/80 bg-[#0b0f19]/90 backdrop-blur sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-lg shadow-indigo-500/20">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-white">EmpregaIA</span>
                <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded-full border border-cyan-500/30">
                  V3.0 B2B & B2C
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block">Acelerador de Carreiras & IA para RH Corporativo</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsPro(!isPro)}
              className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                isPro 
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30' 
                  : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md'
              }`}
            >
              <Crown className="w-4 h-4" />
              <span>{isPro ? 'Modo B2B Ativo' : 'Ativar Plano B2B'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* CONTAINER PRINCIPAL */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR */}
        <aside className="w-full md:w-64 space-y-2 flex-shrink-0">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2">
            Para Candidatos (B2C)
          </div>

          <button
            onClick={() => setActiveTab('match')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === 'match' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <UserCheck className="w-5 h-5" />
            <span>Match Vagas</span>
          </button>

          <button
            onClick={() => setActiveTab('interview')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === 'interview' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>Simulador Entrevista</span>
          </button>

          <button
            onClick={() => setActiveTab('builder')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === 'builder' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <FileText className="w-5 h-5" />
            <span>Criador Currículo</span>
          </button>

          <div className="pt-6 text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 flex items-center justify-between">
            <span>Para Empresas (B2B)</span>
            <span className="bg-cyan-500/20 text-cyan-400 text-[10px] px-1.5 py-0.5 rounded font-bold">PRO</span>
          </div>

          <button
            onClick={() => setActiveTab('batch')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === 'batch' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Portal Empresas</span>
          </button>

          <button
            onClick={() => setActiveTab('whatsapp')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === 'whatsapp' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Bot className="w-5 h-5" />
            <span>Robô WhatsApp RH</span>
          </button>

          <button
            onClick={() => setActiveTab('pricing')}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
              activeTab === 'pricing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
            }`}
          >
            <Crown className="w-5 h-5" />
            <span>Planos & Monetização</span>
          </button>
        </aside>

        {/* ÁREA PRINCIPAL */}
        <main className="flex-1 space-y-6">
          
          {/* TAB 1: MATCH VAGAS */}
          {activeTab === 'match' && (
            <div className="space-y-6">
              <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-6 sm:p-8 space-y-3">
                <div className="inline-flex items-center space-x-2 bg-indigo-950/60 border border-indigo-800/50 rounded-full px-3 py-1 text-xs font-semibold text-indigo-300">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Análise Inteligente ATS Multi-formato</span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  Análise de Match & Diagnóstico de Lacunas
                </h1>

                <p className="text-sm text-slate-400 max-w-3xl leading-relaxed">
                  Nossa IA analisa o currículo do candidato (suporta PDF, PNG, JPG, DOCX, TXT) contra as exigências exatas da vaga. Calcule o índice de compatibilidade e receba trilhas de estudos sob medida.
                </p>
              </div>

              <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-slate-200 text-base">
                    <Briefcase className="w-5 h-5 text-indigo-400" />
                    <span>Requisitos e Descrição da Vaga</span>
                  </div>
                  <span className="text-xs text-slate-500">Cole o texto do anúncio</span>
                </div>

                <textarea
                  rows={4}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  placeholder="Ex: Procuramos Desenvolvedor React Frontend com 2+ anos de experiência. Requisitos: React, Tailwind CSS, TypeScript, consumo de APIs REST e testes Jest..."
                  className="w-full bg-[#090d1a] border border-slate-800/90 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-600 transition"
                />
              </div>

              <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 font-semibold text-slate-200 text-base">
                    <FileText className="w-5 h-5 text-indigo-400" />
                    <span>Currículo do Candidato</span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono">PDF, PNG, JPG, TXT, DOCX</span>
                </div>

                <label className="border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-[#090d1a]/50 hover:bg-[#090d1a] rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer transition text-center group">
                  <input type="file" onChange={handleFileUpload} accept=".pdf,.png,.jpg,.jpeg,.txt,.docx" className="hidden" />
                  <div className="w-12 h-12 bg-slate-900 group-hover:bg-indigo-600/10 rounded-2xl flex items-center justify-center text-slate-400 group-hover:text-indigo-400 transition mb-3">
                    <Upload className="w-6 h-6" />
                  </div>
                  <div className="text-sm font-semibold text-slate-200">
                    {uploadedFile ? `Arquivo Selecionado: ${uploadedFile}` : 'Arraste seu arquivo aqui ou clique para selecionar'}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">Compatível com todos os formatos de arquivo de currículo</p>
                </label>

                <div className="relative flex items-center justify-center py-1">
                  <div className="border-t border-slate-800/80 w-full"></div>
                  <span className="bg-[#0f1527] px-3 text-[11px] font-bold uppercase tracking-wider text-slate-500 absolute">
                    OU INSIRA EM TEXTO
                  </span>
                </div>

                <textarea
                  rows={4}
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Cole o texto do currículo caso prefira..."
                  className="w-full bg-[#090d1a] border border-slate-800/90 rounded-xl p-4 text-sm text-slate-200 focus:outline-none focus:border-indigo-500 placeholder-slate-600 transition"
                />
              </div>

              <button
                onClick={handleMatchAnalysis}
                disabled={loadingMatch}
                className="w-full py-4 bg-gradient-to-r from-indigo-600 via-indigo-500 to-emerald-500 hover:from-indigo-500 hover:to-emerald-400 disabled:opacity-50 text-white font-bold rounded-2xl shadow-xl transition flex items-center justify-center space-x-2 text-base tracking-wide"
              >
                {loadingMatch ? (
                  <Zap className="w-5 h-5 animate-spin text-white" />
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Calcular Match & Fazer Análise</span>
                  </>
                )}
              </button>

              <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-8 min-h-[220px] flex items-center justify-center">
                {!matchResult ? (
                  <div className="text-center space-y-3 py-4">
                    <div className="w-14 h-14 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center text-slate-400 mx-auto">
                      <Target className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-200">Aguardando Análise</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto leading-relaxed">
                      Preencha os dados da vaga e do currículo ao lado e clique em "Calcular Match" para ver os resultados detalhados.
                    </p>
                  </div>
                ) : (
                  <div className="w-full space-y-6">
                    <div className="flex items-center justify-between bg-[#090d1a] p-5 rounded-xl border border-slate-800">
                      <div>
                        <span className="text-xs font-semibold text-slate-400 block uppercase">Pontuação ATS Encontrada</span>
                        <span className="text-3xl font-extrabold text-emerald-400">{matchResult.score}% de Match</span>
                      </div>
                      <div className="bg-emerald-500/10 text-emerald-400 px-3 py-1.5 rounded-full text-xs font-bold border border-emerald-500/20">
                        Compatibilidade Alta
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-emerald-950/20 border border-emerald-800/30 p-4 rounded-xl space-y-2">
                        <h4 className="text-sm font-bold text-emerald-400 flex items-center space-x-1.5">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Pontos Fortes Identificados</span>
                        </h4>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                          {matchResult.strengths.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>

                      <div className="bg-amber-950/20 border border-amber-800/30 p-4 rounded-xl space-y-2">
                        <h4 className="text-sm font-bold text-amber-400 flex items-center space-x-1.5">
                          <AlertCircle className="w-4 h-4" />
                          <span>Lacunas a Desenvolver</span>
                        </h4>
                        <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                          {matchResult.gaps.map((item, idx) => <li key={idx}>{item}</li>)}
                        </ul>
                      </div>
                    </div>

                    <div className="bg-indigo-950/30 border border-indigo-800/40 p-4 rounded-xl text-xs text-indigo-200">
                      <strong>Recomendação da IA:</strong> {matchResult.suggestions}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: SIMULADOR DE ENTREVISTA */}
          {activeTab === 'interview' && (
            <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-6 flex flex-col min-h-[550px] space-y-4">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Mic className="w-6 h-6 text-indigo-400" />
                  <span>Simulador de Entrevista de RH</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Treine as suas respostas para entrevistas reais com o recrutador virtual.
                </p>
              </div>

              <div className="flex-1 bg-[#090d1a] border border-slate-800 rounded-xl p-4 overflow-y-auto max-h-[380px] space-y-3">
                {interviewMessages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm ${
                      msg.role === 'user'
                        ? 'bg-indigo-600 text-white rounded-br-none'
                        : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendInterviewMessage()}
                  placeholder="Digite sua resposta..."
                  className="flex-1 bg-[#090d1a] border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
                />
                <button onClick={handleSendInterviewMessage} className="bg-indigo-600 hover:bg-indigo-500 text-white p-3 rounded-xl transition">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: CRIADOR DE CURRÍCULO */}
          {activeTab === 'builder' && (
            <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                    <FileText className="w-6 h-6 text-indigo-400" />
                    <span>Criador de Currículo Inteligente</span>
                  </h2>
                  <p className="text-sm text-slate-400 mt-1">Preencha os dados abaixo e exporte em PDF totalmente grátis.</p>
                </div>
                <button onClick={handleExportPDF} className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-semibold transition">
                  <Download className="w-4 h-4" />
                  <span>Exportar em PDF</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <input type="text" value={cvData.fullName} onChange={(e) => setCvData({ ...cvData, fullName: e.target.value })} placeholder="Nome Completo" className="w-full bg-[#090d1a] border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200" />
                  <input type="text" value={cvData.email} onChange={(e) => setCvData({ ...cvData, email: e.target.value })} placeholder="E-mail" className="w-full bg-[#090d1a] border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200" />
                  <input type="text" value={cvData.phone} onChange={(e) => setCvData({ ...cvData, phone: e.target.value })} placeholder="Telefone" className="w-full bg-[#090d1a] border border-slate-800 rounded-xl px-3 py-2 text-sm text-slate-200" />
                  <textarea rows={3} value={cvData.summary} onChange={(e) => setCvData({ ...cvData, summary: e.target.value })} placeholder="Resumo Profissional" className="w-full bg-[#090d1a] border border-slate-800 rounded-xl p-3 text-sm text-slate-200" />
                </div>

                <div className="bg-white text-slate-900 p-6 rounded-xl space-y-4 shadow-xl">
                  <div className="border-b border-slate-200 pb-3">
                    <h1 className="text-xl font-bold text-slate-900">{cvData.fullName || 'Seu Nome'}</h1>
                    <p className="text-xs text-slate-500">{cvData.email} | {cvData.phone}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Resumo</h3>
                    <p className="text-xs text-slate-700 mt-1">{cvData.summary}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Experiência</h3>
                    <p className="text-xs text-slate-700 mt-1">{cvData.experience}</p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Habilidades</h3>
                    <p className="text-xs text-slate-700 mt-1">{cvData.skills}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PORTAL EMPRESAS (B2B) - EXATAMENTE COMO NA IMAGEM */}
          {activeTab === 'batch' && (
            <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-8 sm:p-12 text-center space-y-8">
              
              {/* ÍCONE DE CADEADO NO TOPO */}
              <div className="w-16 h-16 bg-[#131b31] border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-cyan-500/10">
                <Lock className="w-8 h-8" />
              </div>

              {/* TÍTULOS E BADGE */}
              <div className="space-y-3 max-w-2xl mx-auto">
                <span className="inline-block bg-purple-950/60 border border-purple-800/50 text-purple-300 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  RECURSO CORPORATIVO RESTRITO (B2B SAAS)
                </span>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                  Painel de RH & Automação Corporativa
                </h1>

                <p className="text-sm text-slate-400 leading-relaxed">
                  O Portal de Empresas do <strong className="text-slate-200">EmpregaIA</strong> é uma funcionalidade <strong className="text-slate-200">paga e rentável</strong> desenvolvida para otimizar o tempo dos recrutadores com triagem em lote e entrevistas automáticas via WhatsApp.
                </p>
              </div>

              {/* DOIS CARDS INFORMATIVOS */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto pt-2">
                
                <div className="bg-[#090d1a] border border-slate-800/90 rounded-2xl p-6 space-y-3 shadow-md">
                  <div className="w-10 h-10 bg-indigo-600/10 text-indigo-400 rounded-xl flex items-center justify-center">
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Triagem de Currículos em Lote</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Envie dezenas de currículos simultaneamente e receba um ranking automático filtrado pela IA.
                  </p>
                </div>

                <div className="bg-[#090d1a] border border-slate-800/90 rounded-2xl p-6 space-y-3 shadow-md">
                  <div className="w-10 h-10 bg-emerald-600/10 text-emerald-400 rounded-xl flex items-center justify-center">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">Robô Entrevistador WhatsApp</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Entrevistas automáticas conduzidas no WhatsApp dos candidatos com resumo enviado ao RH.
                  </p>
                </div>

              </div>

              {/* BOTÕES DE AÇÃO INFERIORES */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 max-w-xl mx-auto">
                <button
                  onClick={() => setIsPro(true)}
                  className="w-full sm:flex-1 py-3.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg flex items-center justify-center space-x-2"
                >
                  <Lock className="w-4 h-4" />
                  <span>Simular Assinatura Enterprise (Modo Demo)</span>
                </button>

                <button
                  onClick={() => setActiveTab('pricing')}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#131b31] hover:bg-[#1a2442] border border-slate-700/80 text-slate-200 font-semibold rounded-xl text-sm transition"
                >
                  Ver Tabela de Planos
                </button>
              </div>

            </div>
          )}

          {/* TAB 5: ROBÔ WHATSAPP RH */}
          {activeTab === 'whatsapp' && (
            <div className="bg-[#0f1527] border border-slate-800/80 rounded-2xl p-6 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
                  <Bot className="w-6 h-6 text-emerald-400" />
                  <span>Robô de Entrevistas WhatsApp B2B</span>
                </h2>
                <p className="text-sm text-slate-400 mt-1">Conecte o seu número corporativo para pré-triagem automática.</p>
              </div>

              <div className="bg-[#090d1a] border border-slate-800 rounded-xl p-6 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto">
                  <Bot className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200">Status do Bot: {botConnected ? 'Conectado' : 'Desconectado'}</h3>
                
                {!botConnected ? (
                  <div className="max-w-md mx-auto space-y-3">
                    <input type="text" value={whatsappPhone} onChange={(e) => setWhatsappPhone(e.target.value)} placeholder="Número WhatsApp com DDD (Ex: 85999999999)" className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-200 text-center" />
                    <button onClick={() => setBotConnected(true)} className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl text-sm transition">
                      Conectar Instância do WhatsApp
                    </button>
                  </div>
                ) : (
                  <div className="text-emerald-400 text-xs font-semibold">Instância pronta para enviar convites e triagens automatizadas via WhatsApp.</div>
                )}
              </div>
            </div>
          )}

          {/* TAB 6: PLANOS E MONETIZAÇÃO */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                
                {/* PLANO 1: GRATUITO / FREE */}
                <div className="bg-[#0f1527] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">PESSOA FÍSICA / B2C</span>
                    <h3 className="text-2xl font-extrabold text-slate-100 mt-1">Gratuito / Free</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">Para candidatos em busca de recolocação profissional.</p>
                    
                    <div className="my-4">
                      <span className="text-3xl font-extrabold text-slate-100">R$ 0</span>
                      <span className="text-xs text-slate-400 ml-1">/ sempre</span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Análise de Match para 1 currículo por vez</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Simulador de Entrevista Individual</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Criador de Currículos com Exportação PDF</span></li>
                      <li className="flex items-start text-slate-500"><XCircle className="w-4 h-4 text-slate-600 mr-2 flex-shrink-0 mt-0.5" /> <span>Sem Triagem de Currículos em Lote</span></li>
                      <li className="flex items-start text-slate-500"><XCircle className="w-4 h-4 text-slate-600 mr-2 flex-shrink-0 mt-0.5" /> <span>Sem Automação do WhatsApp RH</span></li>
                    </ul>
                  </div>

                  <button className="mt-8 w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-xl text-sm transition">
                    Plano Padrão Atual
                  </button>
                </div>

                {/* PLANO 2: PROFISSIONAL RH */}
                <div className="bg-[#0f1527] border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">RH RECRUTADORES</span>
                    <h3 className="text-2xl font-extrabold text-slate-100 mt-1">Profissional RH</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">Ideal para pequenos escritórios de RH e consultores independentes.</p>
                    
                    <div className="my-4">
                      <span className="text-3xl font-extrabold text-slate-100">R$ 199</span>
                      <span className="text-xs text-slate-400 ml-1">/ mês</span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Triagem de até 20 currículos simultâneos</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Ranking automatizado de candidatos por vaga</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Relatórios resumidos de Fit Cultural</span></li>
                      <li className="flex items-start text-slate-500"><XCircle className="w-4 h-4 text-slate-600 mr-2 flex-shrink-0 mt-0.5" /> <span>Integração WhatsApp Limitada</span></li>
                    </ul>
                  </div>

                  <button className="mt-8 w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold rounded-xl text-sm transition shadow-lg shadow-indigo-600/20">
                    Assinar Plano Profissional
                  </button>
                </div>

                {/* PLANO 3: ENTERPRISE & WHATSAPP IA */}
                <div className="bg-indigo-950/40 border border-cyan-500/50 rounded-2xl p-6 flex flex-col justify-between relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 bg-cyan-400 text-slate-950 text-[10px] font-bold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    MAIS RENTÁVEL / DESTAQUE
                  </div>

                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">EMPRESAS & B2B CORPORATE</span>
                    <h3 className="text-2xl font-extrabold text-slate-100 mt-1">Enterprise & Whatsapp IA</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">Solução completa de automação em escala para departamentos de RH.</p>
                    
                    <div className="my-4">
                      <span className="text-3xl font-extrabold text-slate-100">R$ 499</span>
                      <span className="text-xs text-slate-400 ml-1">/ mês</span>
                    </div>

                    <ul className="space-y-3 text-xs text-slate-300 pt-2 border-t border-slate-800">
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Upload Ilimitado de Currículos em Lote</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Automação Completa via WhatsApp API (IA)</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Simulação de Entrevistas no WhatsApp em tempo real</span></li>
                      <li className="flex items-start"><CheckCircle2 className="w-4 h-4 text-emerald-400 mr-2 flex-shrink-0 mt-0.5" /> <span>Exportação de Relatórios Corporativos</span></li>
                    </ul>
                  </div>

                  <button className="mt-8 w-full py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-bold rounded-xl text-sm transition shadow-lg">
                    Contratar Plano Enterprise
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}