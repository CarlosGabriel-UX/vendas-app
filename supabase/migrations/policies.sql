-- Habilitar RLS na tabela products (se não estiver)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Política 1: Permitir LEITURA para todos (público)
CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT 
USING (true);

-- Política 2: Permitir INSERÇÃO apenas para usuários autenticados (admin)
-- Nota: Em um sistema real, você verificaria se o usuário é admin. 
-- Para simplificar agora, vamos liberar para qualquer usuário logado.
CREATE POLICY "Authenticated users can insert products" 
ON products FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

-- Política 3: Permitir ATUALIZAÇÃO para usuários autenticados
CREATE POLICY "Authenticated users can update products" 
ON products FOR UPDATE 
USING (auth.role() = 'authenticated');

-- Política 4: Permitir DELEÇÃO para usuários autenticados
CREATE POLICY "Authenticated users can delete products" 
ON products FOR DELETE 
USING (auth.role() = 'authenticated');
