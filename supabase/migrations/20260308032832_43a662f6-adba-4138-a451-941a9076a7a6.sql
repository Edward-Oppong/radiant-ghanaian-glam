-- Add user_id column to order_items for direct ownership verification
ALTER TABLE public.order_items ADD COLUMN user_id uuid REFERENCES auth.users(id);

-- Backfill existing order_items with user_id from their parent order
UPDATE public.order_items
SET user_id = orders.user_id
FROM public.orders
WHERE order_items.order_id = orders.id;

-- Drop old RLS policies that use indirect subquery
DROP POLICY IF EXISTS "Users can view their own order items" ON public.order_items;
DROP POLICY IF EXISTS "Users can create their own order items" ON public.order_items;

-- Create new direct ownership policies
CREATE POLICY "Users can view their own order items"
  ON public.order_items FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own order items"
  ON public.order_items FOR INSERT
  WITH CHECK (auth.uid() = user_id);