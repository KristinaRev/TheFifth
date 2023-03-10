<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cars</title>
</head>
<body>
<?php

require_once 'config.php';

$sort = $_GET['sort'] ?? 'id';
$page = $_GET['page'] ?? 1;
$perPage = 10;

$offset = ($page - 1) * $perPage;

$query = "SELECT * FROM cars ORDER BY $sort LIMIT $offset, $perPage";
$stmt = $pdo->prepare($query);
$stmt->execute();

$cars = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<table>
    <thead>
        <tr>
            <th><a href="?sort=make">Brand</a></th>
            <th><a href="?sort=model">Model</a></th>
            <th><a href="?sort=color">Color</a></th>
            <th><a href="?sort=quantity">Quantity</a></th>
            <th><a href="?sort=price">Price</a></th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
        <?php foreach ($cars as $car): ?>
        <tr>
            <td><?= $car['make'] ?></td>
            <td><?= $car['model'] ?></td>
            <td><?= $car['color'] ?></td>
            <td><?= $car['quantity'] ?></td>
            <td><?= $car['price'] ?></td>
            <td>
                <a href="edit.php?id=<?= $car['id'] ?>">Edit</a>
                <a href="delete.php?id=<?= $car['id'] ?>" onclick="return confirm('Are you sure?')">Delete</a>
            </td>
        </tr>
        <?php endforeach ?>
    </tbody>
</table>

<a href="add.php">Add new car</a>

</body>
</html>