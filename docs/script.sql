-- Trigger
DELIMITER $$

CREATE TRIGGER trg_atualiza_valor_pedido_after_update
AFTER UPDATE ON itens_pedido
FOR EACH ROW
BEGIN
  -- Só atualiza se a quantidade ou valor mudarem
  IF NEW.quantidade <> OLD.quantidade
    OR NEW.valor_item <> OLD.valor_item THEN

    UPDATE pedidos
    SET valor_total = valor_total
      - (OLD.quantidade * OLD.valor_item)
      + (NEW.quantidade * NEW.valor_item)
    WHERE id_pedido = NEW.id_pedido_fk;
  END IF;
END $$

DELIMITER ;

-- Atualiza o valor_total do pedido caso um item seja deletado
DELIMITER $$
CREATE TRIGGER trg_atualiza_valor_pedido_after_delete
AFTER DELETE ON itens_pedido
FOR EACH ROW
BEGIN
  UPDATE pedidos
  SET valor_total = valor_total - (OLD.quantidade * OLD.valor_item)
  WHERE id_pedido = OLD.id_pedido_fk
END $$

DELIMITER ;
