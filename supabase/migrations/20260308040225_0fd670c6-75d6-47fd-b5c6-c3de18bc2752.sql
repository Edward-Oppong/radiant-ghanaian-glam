-- Step 1: Drop ALL policies that depend on has_role(uuid, app_role)

-- Public tables
DROP POLICY IF EXISTS "Admins can manage categories" ON public.categories;
DROP POLICY IF EXISTS "Admins can manage all order items" ON public.order_items;
DROP POLICY IF EXISTS "Admins can manage all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can view all orders" ON public.orders;
DROP POLICY IF EXISTS "Admins can manage products" ON public.products;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;

-- Storage policies
DROP POLICY IF EXISTS "Admins can upload product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

-- Step 2: Drop and recreate has_role with single param
DROP FUNCTION IF EXISTS public.has_role(uuid, app_role);

CREATE OR REPLACE FUNCTION public.has_role(_role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = auth.uid()
      AND role = _role
  )
$$;

-- Step 3: Recreate all RLS policies with new function signature
CREATE POLICY "Admins can manage categories" ON public.categories FOR ALL USING (has_role('admin'::app_role));
CREATE POLICY "Admins can manage all order items" ON public.order_items FOR ALL USING (has_role('admin'::app_role));
CREATE POLICY "Admins can manage all orders" ON public.orders FOR ALL USING (has_role('admin'::app_role));
CREATE POLICY "Admins can view all orders" ON public.orders FOR SELECT USING (has_role('admin'::app_role));
CREATE POLICY "Admins can manage products" ON public.products FOR ALL USING (has_role('admin'::app_role));
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (has_role('admin'::app_role));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (has_role('admin'::app_role));
CREATE POLICY "Admins can view all roles" ON public.user_roles FOR SELECT USING (has_role('admin'::app_role));

-- Step 4: Recreate storage policies
CREATE POLICY "Admins can upload product images" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'products' AND has_role('admin'::app_role));
CREATE POLICY "Admins can update product images" ON storage.objects FOR UPDATE USING (bucket_id = 'products' AND has_role('admin'::app_role));
CREATE POLICY "Admins can delete product images" ON storage.objects FOR DELETE USING (bucket_id = 'products' AND has_role('admin'::app_role));