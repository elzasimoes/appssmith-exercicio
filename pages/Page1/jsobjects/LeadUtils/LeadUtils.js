export default {
    getCorLead: (lead) => {
        if (!lead) return "";

        // 1. Variáveis base
        const valor = Number(lead.valor_estimado) || 0;
        const status = (lead.status || "").trim();

        // 2. Cálculo da data (Calculado dentro da função)
        const dataCriacao = new Date(lead.data_criacao); 
        const hoje = new Date();
        const diferencaDias = (hoje - dataCriacao) / (1000 * 60 * 60 * 24);

        // 3. Regra de Negócio (PDF)
        
        // Regra A: Lead Quente (Valor > 50k OU Qualificado)
        if (valor > 50000 || status === "Qualificado") {
            return "#bbf7d0"; // Verde
        }

        // Regra B: Lead "Atenção" (Novo há mais de 3 dias)
        // Destaque específico solicitado pelo PDF
        if (status === "Novo" && diferencaDias > 3) {
            return "#fee2e2"; // Vermelho claro (destaque)
        }

        // Regra C: Lead "Novo" (Padrão)
        if (status === "Novo") {
            return "#fecaca"; // Vermelho comum
        }

        // Regra D: Padrão / Em Contato
        return "#fef08a"; // Amarelo
    }
}