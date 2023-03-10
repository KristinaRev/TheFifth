<?php

require_once 'config.php';

$id = $_GET['id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $make = $_POST['make'];
    $model = $_POST['model'];
    $color = $_POST['color'];
    $quantity = $_POST['quantity'];
    $price = $_POST['price'];

    $query = "UPDATE cars SET make = :make, model = :model, color = :color, quantity = :quantity, price = :price WHERE id = :id";
    $stmt = $pdo->prepare($query);
    $stmt->execute(['make' => $make, 'model' => $model, 'color' => $color, 'quantity' => $quantity, 'price' => $price, 'id' => $id]);

    header("Location: index.php");
    exit();
}

$query = "SELECT * FROM cars WHERE id = :id";
$stmt = $pdo->prepare($query);
$stmt->execute(['id' => $id]);

$car = $stmt->fetch(PDO::FETCH_ASSOC);
?>

<form method="post">
    <label>Brand<input type="text" name="make" value="<?= $car['make'] ?>"></label>
    <label>Model<input type="text" name="model" value="<?= $car['model'] ?>"></label>
    <label>Color<input type="text" name="color" value="<?= $car['color'] ?>"></label>
    <label>Quantity<input type="number" name="quantity" value="<?= $car['quantity'] ?>"></label>
    <label>Price<input type="number" step="0.01" name="price" value="<?= $car['price'] ?>"></label>
    <button type="submit">Save</button>
</form>