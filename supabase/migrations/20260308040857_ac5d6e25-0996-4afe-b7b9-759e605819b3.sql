-- Scope the public SELECT policy on storage to specific path prefixes
DROP POLICY IF EXISTS "Anyone can view product images" ON storage.objects;

CREATE POLICY "Anyone can view product images" ON storage.objects
FOR SELECT USING (
  bucket_id = 'products'
  AND (
    name LIKE 'product-images/%'
    OR name LIKE 'categories/%'
  )
);