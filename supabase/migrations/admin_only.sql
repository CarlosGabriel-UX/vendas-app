-- Atualizar RLS para permitir modificações APENAS para o admin específico

-- Remover políticas anteriores que permitiam qualquer usuário logado
DROP POLICY IF EXISTS "Authenticated users can insert products" ON products;
DROP POLICY IF EXISTS "Authenticated users can update products" ON products;
DROP POLICY IF EXISTS "Authenticated users can delete products" ON products;

-- Criar novas políticas restritas ao email do admin
CREATE POLICY "Only admin can insert products" 
ON products FOR INSERT 
WITH CHECK (auth.jwt() ->> 'email' = 'carlosgabriel8058@gmail.com');

CREATE POLICY "Only admin can update products" 
ON products FOR UPDATE 
USING (auth.jwt() ->> 'email' = 'carlosgabriel8058@gmail.com');

CREATE POLICY "Only admin can delete products" 
ON products FOR DELETE 
USING (auth.jwt() ->> 'email' = 'carlosgabriel8058@gmail.com');

-- Garantir que todos continuem podendo VER os produtos (Select)
-- (A política de SELECT pública criada anteriormente continua valendo, não precisa recriar)
