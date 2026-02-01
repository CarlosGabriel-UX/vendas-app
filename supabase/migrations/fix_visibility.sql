-- Garantir que a leitura (SELECT) seja pública para TODOS
DROP POLICY IF EXISTS "Public products are viewable by everyone" ON products;

CREATE POLICY "Public products are viewable by everyone" 
ON products FOR SELECT 
USING (true);
