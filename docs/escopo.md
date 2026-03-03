1. Abertura e Categorização de Chamados
O sistema deve permitir que o usuário (cliente ou atendente) crie um novo chamado informando o título, uma descrição detalhada do problema e a categoria do serviço (ex: Limpeza, Upgrade de Hardware, Formatação, Erro de Software).
2. Vínculo de Equipamento (Inventário)
O sistema deve permitir associar o chamado a um equipamento específico previamente cadastrado no inventário do cliente, utilizando identificadores como Número de Série ou Service Tag.
3. Gestão de Ciclo de Vida (Status)
O sistema deve permitir a alteração do status do chamado ao longo do tempo. Os estados obrigatórios devem incluir: Aberto, Em Diagnóstico, Aguardando Peça, Em Manutenção, Pronto para Retirada e Finalizado.
4. Atribuição de Técnicos
O sistema deve permitir que um administrador ou coordenador atribua um chamado a um técnico específico, ou que o próprio técnico "assuma" um chamado que esteja na fila de espera.
5. Anexo de Arquivos e Evidências
O sistema deve permitir o upload de fotos, capturas de tela (screenshots) ou logs de erro no momento da abertura ou durante a manutenção, para documentar o estado físico ou lógico do computador.
6. Registro de Interações e Notas Técnicas
O sistema deve manter um log cronológico onde o técnico possa inserir atualizações sobre o que foi feito. Deve haver uma distinção entre Notas Públicas (visíveis ao cliente) e Notas Internas (visíveis apenas para a equipe técnica).
7. Definição de Prioridades (SLA)
O sistema deve permitir definir o nível de urgência do chamado (Baixa, Média, Alta, Crítica), calculando automaticamente o prazo limite para resposta e resolução com base no acordo de nível de serviço (SLA).
8. Notificações Automáticas
O sistema deve enviar notificações automáticas (via e-mail ou Whatsapp) para o cliente e para o técnico responsável sempre que houver uma mudança de status ou um novo comentário no chamado.
9. Aprovação de Orçamentos
Caso a manutenção exija custos adicionais (peças novas), o sistema deve permitir o envio de um orçamento dentro do chamado. O chamado só deve prosseguir para o status "Em Manutenção" após a aprovação formal do cliente pelo sistema.
10. Busca e Filtros Avançados
O sistema deve fornecer uma ferramenta de busca que permita localizar chamados por diversos critérios: ID, CPF/CNPJ do cliente, técnico responsável, período de data ou status atual.
