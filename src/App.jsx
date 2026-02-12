import React, { useState, useEffect, useRef, useCallback } from "react";
import "./App.css";
import "./MainMenu.css";
import {
  CoinIcon,
  GemIcon,
  ShopIcon,
  DefaultNinjaIcon,
  ShadowNinjaIcon,
  FireNinjaIcon,
  IceNinjaIcon,
  GoldNinjaIcon,
  DragonNinjaIcon,
  HealthPotionIcon,
  QuestionIcon,
  CloseIcon,
  PauseIcon,
  PlayIcon,
} from "./icons";

const App = () => {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState("menu");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem("ninjaHighScore");
    return saved ? parseInt(saved) : 0;
  });
  const [combo, setCombo] = useState(0);
  const [ninjutsu, setNinjutsu] = useState(100);
  const [coins, setCoins] = useState(() => {
    const saved = localStorage.getItem("ninjaCoins");
    return saved ? parseInt(saved) : 0;
  });
  const [gems, setGems] = useState(() => {
    const saved = localStorage.getItem("ninjaGems");
    return saved ? parseInt(saved) : 0;
  });
  const [energy, setEnergy] = useState(() => {
    const saved = localStorage.getItem("ninjaEnergy");
    return saved ? parseInt(saved) : 0;
  });
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(() => {
    const saved = localStorage.getItem("ninjaMaxHealth");
    return saved ? parseInt(saved) : 100;
  });
  const [level, setLevel] = useState(() => {
    const saved = localStorage.getItem("ninjaLevel");
    return saved ? parseInt(saved) : 1;
  });
  const [exp, setExp] = useState(() => {
    const saved = localStorage.getItem("ninjaExp");
    return saved ? parseInt(saved) : 0;
  });
  const [expToNextLevel, setExpToNextLevel] = useState(() => {
    const saved = localStorage.getItem("ninjaExpToNextLevel");
    return saved ? parseInt(saved) : 100;
  });
  const [maxCombo, setMaxCombo] = useState(() => {
    const saved = localStorage.getItem("ninjaMaxCombo");
    return saved ? parseInt(saved) : 0;
  });
  const [totalDistance, setTotalDistance] = useState(() => {
    const saved = localStorage.getItem("ninjaTotalDistance");
    return saved ? parseInt(saved) : 0;
  });
  const [gameMode, setGameMode] = useState("endless"); // 'endless' or 'survival'
  const [selectedSkin, setSelectedSkin] = useState(() => {
    const saved = localStorage.getItem("ninjaSelectedSkin");
    return saved ? saved : "default";
  });
  const [ownedSkins, setOwnedSkins] = useState(() => {
    const saved = localStorage.getItem("ninjaOwnedSkins");
    return saved ? JSON.parse(saved) : ["default"];
  });
  const [ninjaUpgradeLevel, setNinjaUpgradeLevel] = useState(() => {
    const saved = localStorage.getItem("ninjaUpgradeLevel");
    return saved ? parseInt(saved) : 1;
  });
  const [skillCooldown, setSkillCooldown] = useState(0);
  const [skill2Cooldown, setSkill2Cooldown] = useState(0); // �׵�����ȴ
  const [skill3Cooldown, setSkill3Cooldown] = useState(0); // Ӱ������ȴ
  const [shopTab, setShopTab] = useState("items"); // �̵��ǩҳ
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("success"); // success, error, info
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showDifficultyModal, setShowDifficultyModal] = useState(false); // 难度选择弹窗
  const [selectedDifficulty, setSelectedDifficulty] = useState("normal"); // 选择的难度

  const selectedSkinRef = useRef(selectedSkin);
  const skillCooldownRef = useRef(skillCooldown);
  const skill2CooldownRef = useRef(skill2Cooldown);
  const skill3CooldownRef = useRef(skill3Cooldown);

  useEffect(() => {
    selectedSkinRef.current = selectedSkin;
  }, [selectedSkin]);

  useEffect(() => {
    skillCooldownRef.current = skillCooldown;
  }, [skillCooldown]);

  useEffect(() => {
    skill2CooldownRef.current = skill2Cooldown;
  }, [skill2Cooldown]);

  useEffect(() => {
    skill3CooldownRef.current = skill3Cooldown;
  }, [skill3Cooldown]);

  // �������ݵ����ش洢
  useEffect(() => {
    localStorage.setItem("ninjaHighScore", highScore.toString());
  }, [highScore]);

  useEffect(() => {
    localStorage.setItem("ninjaCoins", coins.toString());
  }, [coins]);

  useEffect(() => {
    localStorage.setItem("ninjaGems", gems.toString());
  }, [gems]);

  useEffect(() => {
    localStorage.setItem("ninjaEnergy", energy.toString());
  }, [energy]);

  useEffect(() => {
    localStorage.setItem("ninjaLevel", level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem("ninjaExp", exp.toString());
  }, [exp]);

  useEffect(() => {
    localStorage.setItem("ninjaExpToNextLevel", expToNextLevel.toString());
  }, [expToNextLevel]);

  useEffect(() => {
    localStorage.setItem("ninjaOwnedSkins", JSON.stringify(ownedSkins));
  }, [ownedSkins]);

  useEffect(() => {
    localStorage.setItem("ninjaUpgradeLevel", ninjaUpgradeLevel.toString());
  }, [ninjaUpgradeLevel]);

  useEffect(() => {
    localStorage.setItem("ninjaMaxHealth", maxHealth.toString());
  }, [maxHealth]);

  useEffect(() => {
    localStorage.setItem("ninjaSelectedSkin", selectedSkin);
  }, [selectedSkin]);

  useEffect(() => {
    localStorage.setItem("ninjaMaxCombo", maxCombo.toString());
  }, [maxCombo]);

  useEffect(() => {
    localStorage.setItem("ninjaTotalDistance", totalDistance.toString());
  }, [totalDistance]);

  // Ƥ�����ã�ÿ�������ж��ؼ��ܣ�
  const skins = {
    default: {
      name: "Classic Ninja",
      color: "#1a1a1a",
      accent: "#ff4500",
      emoji: <DefaultNinjaIcon size={48} />,
      price: 0,
      skill: "Fire Dragon",
      skillDesc: "Shoots 5 fireballs",
      skillCost: 30,
    },
    shadow: {
      name: "Shadow Ninja",
      color: "#0a0a0a",
      accent: "#8b00ff",
      emoji: <ShadowNinjaIcon size={48} />,
      price: 500,
      skill: "Shadow Strike",
      skillDesc: "Teleport and damage all nearby enemies",
      skillCost: 35,
    },
    fire: {
      name: "Fire Ninja",
      color: "#8b0000",
      accent: "#ff6347",
      emoji: <FireNinjaIcon size={48} />,
      price: 800,
      skill: "Inferno Blast",
      skillDesc: "Massive fire explosion",
      skillCost: 40,
    },
    ice: {
      name: "Ice Ninja",
      color: "#00008b",
      accent: "#00ffff",
      emoji: <IceNinjaIcon size={48} />,
      price: 800,
      skill: "Frost Wave",
      skillDesc: "Freeze and slow all enemies",
      skillCost: 35,
    },
    gold: {
      name: "Golden Ninja",
      color: "#ffd700",
      accent: "#ffaa00",
      emoji: <GoldNinjaIcon size={48} />,
      price: 1500,
      skill: "Golden Shield",
      skillDesc: "15s invincibility + coin magnet",
      skillCost: 45,
    },
    dragon: {
      name: "Dragon Ninja",
      color: "#4a0e4a",
      accent: "#ff00ff",
      emoji: <DragonNinjaIcon size={48} />,
      price: 2000,
      skill: "Dragon Fury",
      skillDesc: "Summon dragon to clear screen",
      skillCost: 50,
    },
  };

  // ��ʾ֪ͨ
  const showNotif = (message, type = "success") => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  // �򿪹��򵯴�
  const openPurchaseModal = (item) => {
    setPurchaseData(item);
    setShowPurchaseModal(true);
  };

  // �رչ��򵯴�
  const closePurchaseModal = () => {
    setShowPurchaseModal(false);
    setPurchaseData(null);
  };

  // ȷ�Ϲ���
  const confirmPurchase = () => {
    if (!purchaseData) return;

    const { type, item, key, skin } = purchaseData;

    switch (type) {
      case "ninja":
        if (gems >= skin.price) {
          setGems(gems - skin.price);
          setOwnedSkins([...ownedSkins, key]);
          savePlayerData();
          closePurchaseModal();
          showNotif(`${skin.name} unlocked!`, "success");
        } else {
          showNotif(`Need ${skin.price} gems!`, "error");
        }
        break;

      case "upgrade":
        const cost = ninjaUpgradeLevel * 1000;
        if (coins >= cost) {
          setCoins(coins - cost);
          setNinjaUpgradeLevel(ninjaUpgradeLevel + 1);
          setMaxHealth(maxHealth + 20);
          setHealth(maxHealth + 20);
          savePlayerData();
          closePurchaseModal();
          showNotif(`Upgraded to Level ${ninjaUpgradeLevel + 1}!`, "success");
        } else {
          showNotif(`Need ${cost} coins!`, "error");
        }
        break;

      case "item":
        if (item.currency === "coins" && coins >= item.price) {
          setCoins(coins - item.price);
          if (item.effect) item.effect();
          savePlayerData();
          closePurchaseModal();
          showNotif(`${item.title} purchased!`, "success");
        } else if (item.currency === "gems" && gems >= item.price) {
          setGems(gems - item.price);
          if (item.effect) item.effect();
          savePlayerData();
          closePurchaseModal();
          showNotif(`${item.title} purchased!`, "success");
        } else {
          showNotif(`Not enough ${item.currency}!`, "error");
        }
        break;
    }
  };

  // ���㼼����ȴʱ�䣨����15�룬ÿ����1������0.5�룬���5�룩
  const getSkillCooldownTime = () => {
    const baseCooldown = 15; // 15��
    const reduction = (ninjaUpgradeLevel - 1) * 0.5; // ÿ������0.5��
    const finalCooldown = Math.max(5, baseCooldown - reduction); // ���5��
    return finalCooldown * 60; // ת��Ϊ֡����60֡/�룩
  };

  // �����������辭�飨ָ��������
  const calculateExpForNextLevel = (currentLevel) => {
    // ��������100��ÿ������50%
    return Math.floor(100 * Math.pow(1.5, currentLevel - 1));
  };

  // �ȼ���������
  const handleLevelUp = () => {
    const newLevel = level + 1;
    setLevel(newLevel);

    // �����µ��������辭��
    const newExpRequired = calculateExpForNextLevel(newLevel);
    setExpToNextLevel(newExpRequired);
    setExp(0);

    // �ȼ�����
    const rewards = {
      coins: newLevel * 100, // ÿ������ �ȼ���100 ���
      gems: Math.floor(newLevel / 5) * 10, // ÿ5������10��ʯ
      health: 20, // ÿ������20���Ѫ��
      energy: newLevel % 10 === 0 ? 50 : 0, // ÿ10������50����
    };

    // Ӧ�ý���
    setCoins((c) => c + rewards.coins);
    if (rewards.gems > 0) {
      setGems((g) => g + rewards.gems);
    }
    if (rewards.energy > 0) {
      setEnergy((e) => e + rewards.energy);
    }

    // �������Ѫ�����ָ�Ѫ��
    const game = gameRef.current;
    const newMaxHealth = maxHealth + rewards.health;
    setMaxHealth(newMaxHealth);
    game.ninja.maxHealth = newMaxHealth;
    game.ninja.health = Math.min(
      newMaxHealth,
      game.ninja.health + rewards.health,
    );
    setHealth(game.ninja.health);

    // �ָ���������
    game.ninja.ninjutsu = game.ninja.maxNinjutsu;
    setNinjutsu(game.ninja.ninjutsu);

    // ��������
    savePlayerData();

    // ��ʾ������ʾ
    console.log(`?? LEVEL UP! Now Level ${newLevel}`);
    console.log(
      `Rewards: +${rewards.coins} Coins, +${rewards.gems} Gems, +${rewards.health} Max HP, +${rewards.energy} Energy`,
    );

    return rewards;
  };

  // ���������������
  const savePlayerData = () => {
    try {
      const playerData = {
        highScore,
        coins,
        gems,
        energy,
        level,
        exp,
        expToNextLevel,
        maxHealth,
        ninjaUpgradeLevel,
        selectedSkin,
        ownedSkins,
        maxCombo,
        totalDistance,
        savedAt: new Date().toISOString(),
      };
      localStorage.setItem("ninjaPlayerData", JSON.stringify(playerData));
      console.log("Player data saved successfully!");
    } catch (error) {
      console.error("Failed to save player data:", error);
    }
  };

  // ���������������
  const loadPlayerData = () => {
    try {
      const savedData = localStorage.getItem("ninjaPlayerData");
      if (savedData) {
        const playerData = JSON.parse(savedData);
        console.log("Player data loaded:", playerData);
        return playerData;
      }
    } catch (error) {
      console.error("Failed to load player data:", error);
    }
    return null;
  };

  const gameRef = useRef({
    ninja: {
      x: 100,
      y: 300,
      width: 40,
      height: 60,
      velocityY: 0,
      isJumping: false,
      canDoubleJump: true,
      isAttacking: false,
      attackCooldown: 0,
      ninjutsu: 100,
      maxNinjutsu: 100,
      combo: 0,
      isRolling: false,
      rollCooldown: 0,
      rollDirection: 0,
      onTopSide: false,
      health: 100,
      maxHealth: 100,
      invincible: false,
      invincibleTime: 0,
      coinMagnet: false,
      coinMagnetTime: 0,
    },
    obstacles: [],
    enemies: [],
    coins: [],
    healthPacks: [],
    background: 0,
    speed: 3,
    gravity: 0.8,
    jumpPower: -15,
    keys: {},
    frameCount: 0,
    particles: [],
    difficulty: "normal",
    ropeY: 200,
  });

  // ��ʼ��Ϸ
  // 显示难度选择
  const showDifficultySelection = () => {
    setShowDifficultyModal(true);
  };

  // 确认难度并开始游戏
  const startGame = useCallback(
    (difficulty) => {
      const game = gameRef.current;

      // 根据难度设置游戏参数
      let speedMultiplier = 1;
      let rewardMultiplier = 1;

      switch (difficulty) {
        case "easy":
          speedMultiplier = 0.7;
          rewardMultiplier = 0.8;
          game.speed = 2;
          break;
        case "normal":
          speedMultiplier = 1;
          rewardMultiplier = 1;
          game.speed = 3;
          break;
        case "hard":
          speedMultiplier = 1.5;
          rewardMultiplier = 1.5;
          game.speed = 5;
          break;
        case "extreme":
          speedMultiplier = 2;
          rewardMultiplier = 2;
          game.speed = 7;
          break;
        default:
          game.speed = 3;
      }

      // 重置游戏状态
      game.ninja.velocityY = 0;
      game.ninja.isJumping = false;
      game.ninja.canDoubleJump = true;
      game.ninja.ninjutsu = 100;
      game.ninja.combo = 0;
      game.ninja.isRolling = false;
      game.ninja.rollCooldown = 0;
      game.ninja.onTopSide = false;
      game.ninja.health = maxHealth;
      game.ninja.maxHealth = maxHealth;
      game.ninja.invincible = false;
      game.ninja.invincibleTime = 0;
      game.ninja.coinMagnet = false;
      game.ninja.coinMagnetTime = 0;
      game.obstacles = [];
      game.enemies = [];
      game.coins = [];
      game.healthPacks = [];
      game.background = 0;
      game.frameCount = 0;
      game.particles = [];
      game.speedMultiplier = speedMultiplier;
      game.rewardMultiplier = rewardMultiplier;
      game.difficulty = difficulty;

      setScore(0);
      setCombo(0);
      setNinjutsu(100);
      setHealth(maxHealth);
      setShowDifficultyModal(false);
      setGameState("playing");
    },
    [maxHealth],
  );

  // �����¼�
  useEffect(() => {
    const handleKeyDown = (e) => {
      gameRef.current.keys[e.key] = true;

      // ESC pause/resume
      if (e.key === "Escape" && gameState === "playing") {
        setGameState("paused");
      } else if (e.key === "Escape" && gameState === "paused") {
        setGameState("playing");
      }
    };

    const handleKeyUp = (e) => {
      gameRef.current.keys[e.key] = false;
    };

    // ҳ��ر�ǰ��������
    const handleBeforeUnload = () => {
      savePlayerData();
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [gameState]);

  // ��Ϸѭ��
  useEffect(() => {
    if (gameState !== "playing") return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const game = gameRef.current;

    // ����canvas�ߴ�Ϊ���ڴ�С
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight - 150;

    // ��������λ��Ϊ��������
    game.ropeY = canvas.height / 2;

    // ��ʼ������λ��
    if (game.frameCount === 0) {
      game.ninja.y = game.ropeY + 10; // �������·�
    }

    let animationId;

    const gameLoop = () => {
      game.frameCount++;

      // ȷ��canvas�ߴ���ȷ
      if (
        canvas.width !== window.innerWidth ||
        canvas.height !== window.innerHeight - 150
      ) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight - 150;
        game.ropeY = canvas.height / 2;
      }

      // ��ɫ���б���
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "#1a1a2e");
      gradient.addColorStop(0.5, "#16213e");
      gradient.addColorStop(1, "#0f3460");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ��̬�����������ٶȸУ�
      ctx.strokeStyle = "rgba(255, 69, 0, 0.15)";
      ctx.lineWidth = 2;
      for (let i = 0; i < 5; i++) {
        const offset = (game.frameCount * (2 + i * 0.5)) % canvas.width;
        ctx.beginPath();
        ctx.moveTo(offset, 100 + i * 50);
        ctx.lineTo(offset - 100, 100 + i * 50);
        ctx.stroke();
      }

      // ���м�Ӱ����
      ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
      for (let i = 0; i < canvas.width; i += 80) {
        const height = 100 + Math.random() * 80;
        ctx.fillRect(i, canvas.height - height, 60, height);
      }

      // ��������
      ctx.strokeStyle = "#8B4513";
      ctx.lineWidth = 4;
      ctx.shadowBlur = 5;
      ctx.shadowColor = "#000";
      ctx.beginPath();
      ctx.moveTo(0, game.ropeY);
      ctx.lineTo(canvas.width, game.ropeY);
      ctx.stroke();
      ctx.shadowBlur = 0;

      // �����ڵ�װ��
      ctx.fillStyle = "#654321";
      for (let i = 0; i < canvas.width; i += 50) {
        ctx.beginPath();
        ctx.arc(i, game.ropeY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // ������Ծ�߼�����ʱ���ã���Ϊ��ת��
      // if ((game.keys[' '] || game.keys['ArrowUp'] || game.keys['w']) && !game.ninja.isRolling) {
      //   // ��Ծ�߼�
      // }

      // ���·�ת������������һ�ࣩ
      if (
        (game.keys["s"] || game.keys["ArrowDown"]) &&
        game.ninja.rollCooldown === 0 &&
        !game.ninja.isRolling
      ) {
        game.ninja.isRolling = true;
        game.ninja.rollCooldown = 30;
        game.ninja.onTopSide = !game.ninja.onTopSide; // �л�����һ��
        delete game.keys["s"];
        delete game.keys["ArrowDown"];
      }

      // ������ȴ
      if (game.ninja.rollCooldown > 0) {
        game.ninja.rollCooldown--;
      }

      // ��������ʱ��
      if (game.ninja.isRolling && game.ninja.rollCooldown < 15) {
        game.ninja.isRolling = false;
      }

      // �޵�ʱ�䵹��ʱ
      if (game.ninja.invincibleTime > 0) {
        game.ninja.invincibleTime--;
        if (game.ninja.invincibleTime === 0) {
          game.ninja.invincible = false;
        }
      }

      if (game.ninja.coinMagnetTime > 0) {
        game.ninja.coinMagnetTime--;
        if (game.ninja.coinMagnetTime === 0) {
          game.ninja.coinMagnet = false;
        }
      }

      // ��������������һ����������λ��
      const targetY = game.ninja.onTopSide ? game.ropeY - 60 : game.ropeY + 10;

      if (game.ninja.isRolling) {
        // ��������
        const progress = (30 - game.ninja.rollCooldown) / 30;
        const startY = game.ninja.onTopSide ? game.ropeY + 10 : game.ropeY - 60;
        game.ninja.y = startY + (targetY - startY) * progress;
      } else {
        game.ninja.y = targetY;
      }

      // �����߼�
      if (
        (game.keys["x"] || game.keys["X"]) &&
        game.ninja.attackCooldown === 0
      ) {
        game.ninja.isAttacking = true;
        game.ninja.attackCooldown = 20;
        delete game.keys["x"];
        delete game.keys["X"];
      }

      // �������� - ����ѡ�������ʹ�ò�ͬ����
      if (
        (game.keys["z"] || game.keys["Z"]) &&
        game.ninja.ninjutsu >= skins[activeSkinKey].skillCost &&
        skillCooldownRef.current === 0
      ) {
        game.ninja.ninjutsu -= skins[activeSkinKey].skillCost;
        setNinjutsu(game.ninja.ninjutsu);
        const cd = getSkillCooldownTime();
        skillCooldownRef.current = cd;
        setSkillCooldown(cd);

        // �������������ͷŲ�ͬ����
        switch (activeSkinKey) {
          case "default":
            // �����׵� - 5������
            for (let i = 0; i < 5; i++) {
              game.particles.push({
                x: game.ninja.x + 40,
                y: game.ninja.y + 20 + i * 10,
                vx: 10,
                vy: (i - 2) * 2,
                life: 80,
                type: "fireball",
                damage: true,
              });
            }
            break;

          case "shadow":
            // ��ӰͻϮ - ���Ͳ��˺���������
            game.enemies.forEach((enemy, index) => {
              if (Math.abs(enemy.x - game.ninja.x) < 300) {
                game.enemies.splice(index, 1);
                setScore((s) => s + 15);
                game.ninja.combo++;
                setCombo(game.ninja.combo);
              }
            });
            // ��Ӱ����
            for (let i = 0; i < 20; i++) {
              game.particles.push({
                x: game.ninja.x + 20,
                y: game.ninja.y + 30,
                vx: Math.cos((i * Math.PI) / 10) * 6,
                vy: Math.sin((i * Math.PI) / 10) * 6,
                life: 40,
                type: "shadow",
              });
            }
            break;

          case "fire":
            // ������ը - ��Χ����
            for (let i = 0; i < 15; i++) {
              const angle = (i / 15) * Math.PI * 2;
              game.particles.push({
                x: game.ninja.x + 40,
                y: game.ninja.y + 30,
                vx: Math.cos(angle) * 8,
                vy: Math.sin(angle) * 8,
                life: 100,
                type: "fireball",
                damage: true,
              });
            }
            break;

          case "ice":
            // ��˪�� - ���Ტ���ٵ���
            game.enemies.forEach((enemy) => {
              enemy.frozenTime = 180; // 3�붳��
            });
            // ��˪����
            for (let i = 0; i < 30; i++) {
              game.particles.push({
                x: game.ninja.x + Math.random() * 200,
                y: game.ninja.y + Math.random() * 100 - 50,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 4,
                life: 60,
                type: "ice",
              });
            }
            break;

          case "gold":
            // �ƽ𻤶� - �޵� + ����
            game.ninja.invincible = true;
            game.ninja.invincibleTime = 900; // 15��
            game.ninja.coinMagnet = true;
            game.ninja.coinMagnetTime = 900;
            // ��ɫ����
            for (let i = 0; i < 25; i++) {
              game.particles.push({
                x: game.ninja.x + 20,
                y: game.ninja.y + 30,
                vx: Math.cos((i * Math.PI) / 12.5) * 5,
                vy: Math.sin((i * Math.PI) / 12.5) * 5,
                life: 80,
                type: "gold",
              });
            }
            break;

          case "dragon":
            // ��֮ŭ - ����
            game.enemies.forEach(() => {
              setScore((s) => s + 25);
              game.ninja.combo++;
            });
            game.enemies = [];
            game.obstacles = [];
            setCombo(game.ninja.combo);
            // ��������
            for (let i = 0; i < 50; i++) {
              game.particles.push({
                x: game.ninja.x + i * 10,
                y: game.ninja.y + Math.sin(i * 0.5) * 30,
                vx: 15,
                vy: Math.cos(i * 0.5) * 2,
                life: 60,
                type: "dragon",
                damage: true,
              });
            }
            break;
        }

        delete game.keys["z"];
        delete game.keys["Z"];
      }

      // �׵�������X���ͷţ�- ͨ�ü���
      if (
        (game.keys["x"] || game.keys["X"]) &&
        game.ninja.ninjutsu >= 40 &&
        skill2CooldownRef.current === 0
      ) {
        game.ninja.ninjutsu -= 40;
        setNinjutsu(game.ninja.ninjutsu);
        skill2CooldownRef.current = 1200;
        setSkill2Cooldown(1200); // 20����ȴ

        // ������е���
        game.enemies.forEach(() => {
          setScore((s) => s + 20);
          game.ninja.combo++;
        });
        game.enemies = [];
        game.obstacles = [];

        // �׵�����Ч��
        for (let i = 0; i < 30; i++) {
          game.particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 5,
            vy: (Math.random() - 0.5) * 5,
            life: 30,
            type: "thunder",
          });
        }

        setCombo(game.ninja.combo);
        delete game.keys["x"];
        delete game.keys["X"];
      }

      // Ӱ����������C���ͷţ�- ͨ�ü���
      if (
        (game.keys["c"] || game.keys["C"]) &&
        game.ninja.ninjutsu >= 50 &&
        skill3CooldownRef.current === 0
      ) {
        game.ninja.ninjutsu -= 50;
        setNinjutsu(game.ninja.ninjutsu);
        skill3CooldownRef.current = 1800;
        setSkill3Cooldown(1800); // 30����ȴ

        // ����10���޵�ʱ��
        game.ninja.invincible = true;
        game.ninja.invincibleTime = 600; // 10��

        // ����������Ч
        for (let i = 0; i < 20; i++) {
          game.particles.push({
            x: game.ninja.x + 20,
            y: game.ninja.y + 30,
            vx: Math.cos((i * Math.PI) / 10) * 8,
            vy: Math.sin((i * Math.PI) / 10) * 8,
            life: 60,
            type: "clone",
          });
        }

        delete game.keys["c"];
        delete game.keys["C"];
      }

      if (game.ninja.attackCooldown > 0) {
        game.ninja.attackCooldown--;
      }

      if (game.ninja.isAttacking && game.ninja.attackCooldown < 10) {
        game.ninja.isAttacking = false;
      }

      // ������ȴ����ʱ
      if (skillCooldownRef.current > 0) {
        setSkillCooldown((prev) => {
          const next = Math.max(0, prev - 1);
          skillCooldownRef.current = next;
          return next;
        });
      }
      if (skill2CooldownRef.current > 0) {
        setSkill2Cooldown((prev) => {
          const next = Math.max(0, prev - 1);
          skill2CooldownRef.current = next;
          return next;
        });
      }
      if (skill3CooldownRef.current > 0) {
        setSkill3Cooldown((prev) => {
          const next = Math.max(0, prev - 1);
          skill3CooldownRef.current = next;
          return next;
        });
      }

      // Ӧ�����������ã���Ϊ�����������ϣ�
      // game.ninja.velocityY += game.gravity;
      // game.ninja.y += game.ninja.velocityY;

      // ������ײ�����ã�
      // if (game.ninja.y >= 300) {
      //   game.ninja.y = 300;
      //   game.ninja.velocityY = 0;
      //   game.ninja.isJumping = false;
      //   game.ninja.canDoubleJump = true;
      // }

      // �������ߣ��ִ����з��
      const ninjaX = game.ninja.x;
      const ninjaY = game.ninja.y;
      const activeSkinKey = selectedSkinRef.current;
      const currentSkin = skins[activeSkinKey];

      // �޵�ʱ��˸Ч��
      const isVisible =
        !game.ninja.invincible || Math.floor(game.frameCount / 5) % 2 === 0;

      if (isVisible) {
        // ����״̬�µ���תЧ��
        if (game.ninja.isRolling) {
          ctx.save();
          ctx.translate(ninjaX + 20, ninjaY + 30);
          ctx.rotate(game.frameCount * 0.5 * (Math.PI / 180));
          ctx.translate(-(ninjaX + 20), -(ninjaY + 30));

          // �����⻷
          ctx.shadowBlur = 20;
          ctx.shadowColor = currentSkin.accent;
          ctx.strokeStyle = currentSkin.accent;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(ninjaX + 20, ninjaY + 30, 35, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // �������壨ʹ��Ƥ����ɫ��
        ctx.shadowBlur = 10;
        ctx.shadowColor = game.ninja.isRolling
          ? currentSkin.accent
          : game.ninja.invincible
            ? "#ff0000"
            : currentSkin.accent;
        ctx.fillStyle = currentSkin.color;
        ctx.beginPath();
        ctx.ellipse(ninjaX + 20, ninjaY + 35, 18, 25, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // ������Ե
        ctx.strokeStyle = game.ninja.isRolling
          ? currentSkin.accent
          : game.ninja.invincible
            ? "#ff0000"
            : currentSkin.accent;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(ninjaX + 20, ninjaY + 35, 18, 25, 0, 0, Math.PI * 2);
        ctx.stroke();

        // ����ͷ��
        ctx.fillStyle = currentSkin.color === "#ffd700" ? "#ffaa00" : "#2c2c2c";
        ctx.beginPath();
        ctx.arc(ninjaX + 20, ninjaY + 15, 12, 0, Math.PI * 2);
        ctx.fill();

        // ��������
        ctx.fillStyle = "#FFE4C4";
        ctx.fillRect(ninjaX + 12, ninjaY + 12, 16, 8);

        // �����۾������⣩
        ctx.shadowBlur = 5;
        ctx.shadowColor = game.ninja.isRolling
          ? currentSkin.accent
          : game.ninja.invincible
            ? "#ff0000"
            : currentSkin.accent;
        ctx.fillStyle = game.ninja.isRolling
          ? currentSkin.accent
          : game.ninja.invincible
            ? "#ff0000"
            : currentSkin.accent;
        ctx.fillRect(ninjaX + 14, ninjaY + 14, 4, 2);
        ctx.fillRect(ninjaX + 22, ninjaY + 14, 4, 2);
        ctx.shadowBlur = 0;

        if (!game.ninja.isRolling) {
          // �����Ȳ����ܶ���̬��
          const legOffset = Math.sin(game.frameCount * 0.3) * 5;
          ctx.strokeStyle = currentSkin.color;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(ninjaX + 15, ninjaY + 55);
          ctx.lineTo(ninjaX + 10, ninjaY + 60 + legOffset);
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(ninjaX + 25, ninjaY + 55);
          ctx.lineTo(ninjaX + 30, ninjaY + 60 - legOffset);
          ctx.stroke();
        }

        if (game.ninja.isRolling) {
          ctx.restore();
        }

        // ������Ч���޺絶�⣩
        if (game.ninja.isAttacking) {
          const slashAlpha = game.ninja.attackCooldown / 20;
          ctx.shadowBlur = 20;
          ctx.shadowColor = currentSkin.accent;
          ctx.strokeStyle = `rgba(${currentSkin.accent === "#ff4500" ? "255, 69, 0" : currentSkin.accent === "#8b00ff" ? "139, 0, 255" : currentSkin.accent === "#ff6347" ? "255, 99, 71" : currentSkin.accent === "#00ffff" ? "0, 255, 255" : currentSkin.accent === "#ffaa00" ? "255, 170, 0" : "255, 0, 255"}, ${slashAlpha})`;
          ctx.lineWidth = 4;
          ctx.beginPath();
          ctx.moveTo(ninjaX + 40, ninjaY + 15);
          ctx.lineTo(ninjaX + 75, ninjaY + 25);
          ctx.stroke();

          ctx.strokeStyle = `rgba(${currentSkin.accent === "#ff4500" ? "255, 140, 0" : currentSkin.accent === "#8b00ff" ? "200, 100, 255" : currentSkin.accent === "#ff6347" ? "255, 140, 100" : currentSkin.accent === "#00ffff" ? "100, 255, 255" : currentSkin.accent === "#ffaa00" ? "255, 200, 100" : "255, 100, 255"}, ${slashAlpha * 0.7})`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.moveTo(ninjaX + 40, ninjaY + 20);
          ctx.lineTo(ninjaX + 70, ninjaY + 30);
          ctx.stroke();
          ctx.shadowBlur = 0;
        }
      }

      // �������������޺�Ч����
      if (game.ninja.combo > 0) {
        ctx.font = "bold 28px Arial";
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff4500";
        ctx.fillStyle = "#ff4500";
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = 2;
        const comboText = `${game.ninja.combo} COMBO!`;
        ctx.strokeText(comboText, ninjaX - 10, ninjaY - 10);
        ctx.fillText(comboText, ninjaX - 10, ninjaY - 10);
        ctx.shadowBlur = 0;
      }

      // ��̬�Ѷȵ���
      const difficultyMultiplier = 1 + Math.floor(game.frameCount / 1000) * 0.1;

      // �����ϰ�������Ѷȵ������������඼�У�����ʱ�������Ѷȣ�
      const baseObstacleFreq =
        game.difficulty === "hard"
          ? 70
          : game.difficulty === "easy"
            ? 130
            : 100;
      const obstacleFrequency = Math.max(
        40,
        baseObstacleFreq - Math.floor(game.frameCount / 500) * 5,
      );
      if (game.frameCount % obstacleFrequency === 0) {
        const side = Math.random() < 0.5 ? "top" : "bottom";
        // ������ɲ�ͬ���͵��ϰ���
        const obstacleTypes =
          game.difficulty === "easy"
            ? ["ground", "ground", "moving"]
            : ["ground", "spike", "moving"];
        const obstacleType =
          obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
        game.obstacles.push({
          x: canvas.width,
          y: side === "top" ? game.ropeY - 90 : game.ropeY + 40,
          width: 30,
          height: 30,
          type: obstacleType,
          side: side,
          moveOffset: 0,
        });
      }

      // ���ɵ��ˣ������Ѷȵ������������඼�У�
      const baseEnemyFreq =
        game.difficulty === "hard"
          ? 100
          : game.difficulty === "easy"
            ? 180
            : 150;
      const enemyFrequency = Math.max(
        60,
        baseEnemyFreq - Math.floor(game.frameCount / 500) * 5,
      );
      if (game.frameCount % enemyFrequency === 0) {
        const side = Math.random() < 0.5 ? "top" : "bottom";
        game.enemies.push({
          x: canvas.width,
          y: side === "top" ? game.ropeY - 80 : game.ropeY + 30,
          width: 35,
          height: 50,
          type: "enemy",
          health: game.difficulty === "hard" ? 2 : 1,
          side: side,
          frozenTime: 0,
        });
      }

      // ���ɽ�ң���������������Ƶ����
      if (game.frameCount % 50 === 0) {
        const side = Math.random() < 0.5 ? "top" : "bottom";
        game.coins.push({
          x: canvas.width,
          y: side === "top" ? game.ropeY - 50 : game.ropeY + 30,
          width: 20,
          height: 20,
          collected: false,
          side: side,
        });
      }

      // ������ʯ��ϡ�У��߼�ֵ��
      if (game.frameCount % 200 === 0) {
        const side = Math.random() < 0.5 ? "top" : "bottom";
        game.coins.push({
          x: canvas.width,
          y: side === "top" ? game.ropeY - 50 : game.ropeY + 30,
          width: 20,
          height: 20,
          collected: false,
          side: side,
          isGem: true,
        });
      }

      // �������ư�������Ƶ�ʣ�
      if (
        game.frameCount % 250 === 0 &&
        game.ninja.health < game.ninja.maxHealth
      ) {
        const side = Math.random() < 0.5 ? "top" : "bottom";
        game.healthPacks.push({
          x: canvas.width,
          y: side === "top" ? game.ropeY - 50 : game.ropeY + 30,
          width: 25,
          height: 25,
          collected: false,
          side: side,
        });
      }

      // ���ºͻ����ϰ���޺���ʯ��
      game.obstacles = game.obstacles.filter((obs) => {
        obs.x -= game.speed;

        // �ƶ��ϰ���������ƶ�
        if (obs.type === "moving") {
          obs.moveOffset = Math.sin(game.frameCount * 0.05) * 15;
        }

        const drawY = obs.y + (obs.moveOffset || 0);

        // �������ͻ��Ʋ�ͬ���ϰ���
        if (obs.type === "spike") {
          // ����ϰ�
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#ff0000";
          ctx.fillStyle = "#8b0000";
          ctx.beginPath();
          ctx.moveTo(obs.x + 15, drawY);
          ctx.lineTo(obs.x + 30, drawY + 30);
          ctx.lineTo(obs.x, drawY + 30);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#ff0000";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (obs.type === "moving") {
          // �ƶ��ϰ�
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#00ffff";
          ctx.fillStyle = "#004a4a";
          ctx.beginPath();
          ctx.arc(obs.x + 15, drawY + 15, 15, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = "#00ffff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else {
          // ��ͨ��ʯ
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#8b0000";
          ctx.fillStyle = "#4a0000";
          ctx.beginPath();
          ctx.moveTo(obs.x + 15, drawY);
          ctx.lineTo(obs.x + 30, drawY + 10);
          ctx.lineTo(obs.x + 30, drawY + 25);
          ctx.lineTo(obs.x + 15, drawY + 30);
          ctx.lineTo(obs.x, drawY + 25);
          ctx.lineTo(obs.x, drawY + 10);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#ff0000";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        }

        // ��ײ��⣨����ʱ���Դ����ϰ�����ֻ���ͬһ����ϰ���
        const ninjaOnSide = game.ninja.onTopSide ? "top" : "bottom";
        const obsDrawY = obs.y + (obs.moveOffset || 0);
        const isColliding =
          !game.ninja.isRolling &&
          !game.ninja.invincible &&
          obs.side === ninjaOnSide &&
          game.ninja.x < obs.x + obs.width &&
          game.ninja.x + game.ninja.width > obs.x &&
          game.ninja.y + 10 < obsDrawY + obs.height &&
          game.ninja.y + game.ninja.height > obsDrawY;

        if (isColliding) {
          // �����ϰ�������ɲ�ͬ�˺�
          const damage = obs.type === "spike" ? 30 : 20;
          game.ninja.health -= damage;
          setHealth(game.ninja.health);
          game.ninja.invincible = true;
          game.ninja.invincibleTime = 60;

          // ��������
          game.ninja.combo = 0;
          setCombo(0);

          // �����˺���Ч
          for (let i = 0; i < 10; i++) {
            game.particles.push({
              x: game.ninja.x + 20,
              y: game.ninja.y + 30,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              life: 30,
              type: "damage",
            });
          }

          // ����Ƿ�����
          if (game.ninja.health <= 0) {
            game.ninja.health = 0;
            setHealth(0);
            setGameState("gameOver");
            if (score > highScore) {
              setHighScore(score);
            }
            savePlayerData(); // �����������
            return false;
          }
        }

        return obs.x > -obs.width;
      });

      // ���ºͻ��Ƶ��ˣ��޺���ʿ��
      game.enemies = game.enemies.filter((enemy) => {
        if ((enemy.frozenTime ?? 0) > 0) {
          enemy.frozenTime--;
        } else {
          enemy.x -= game.speed;
        }

        // �������壨����ɫ����Ч��
        ctx.shadowBlur = 12;
        ctx.shadowColor = "#8b008b";
        ctx.fillStyle = "#4a0e4a";
        ctx.beginPath();
        ctx.ellipse(enemy.x + 17, enemy.y + 30, 15, 20, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // ��ɫ��Ե��
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.ellipse(enemy.x + 17, enemy.y + 30, 15, 20, 0, 0, Math.PI * 2);
        ctx.stroke();

        // ����ͷ��
        ctx.fillStyle = "#5a1e5a";
        ctx.beginPath();
        ctx.arc(enemy.x + 17, enemy.y + 12, 10, 0, Math.PI * 2);
        ctx.fill();

        // �����沿
        ctx.fillStyle = "#FFE4C4";
        ctx.fillRect(enemy.x + 10, enemy.y + 10, 14, 6);

        // �����۾�����ɫ���⣩
        ctx.shadowBlur = 5;
        ctx.shadowColor = "#ff00ff";
        ctx.fillStyle = "#ff00ff";
        ctx.fillRect(enemy.x + 12, enemy.y + 12, 3, 2);
        ctx.fillRect(enemy.x + 19, enemy.y + 12, 3, 2);
        ctx.shadowBlur = 0;

        // ��������
        ctx.strokeStyle = "#ff00ff";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(enemy.x + 5, enemy.y + 25);
        ctx.lineTo(enemy.x - 5, enemy.y + 20);
        ctx.stroke();

        // ������⣨ֻ�ܹ���ͬһ��ĵ��ˣ�
        if (
          game.ninja.isAttacking &&
          enemy.side === (game.ninja.onTopSide ? "top" : "bottom") &&
          game.ninja.x + game.ninja.width + 30 > enemy.x &&
          game.ninja.x < enemy.x + enemy.width &&
          game.ninja.y < enemy.y + enemy.height &&
          game.ninja.y + game.ninja.height > enemy.y
        ) {
          enemy.health--;
          if (enemy.health <= 0) {
            // ������Ч���޺籬ը��
            ctx.shadowBlur = 20;
            ctx.shadowColor = "#ff00ff";
            ctx.fillStyle = "rgba(255, 0, 255, 0.3)";
            for (let i = 0; i < 5; i++) {
              ctx.beginPath();
              ctx.arc(enemy.x + 17, enemy.y + 25, 10 + i * 5, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.shadowBlur = 0;
            setScore((s) => s + 10);

            // ֻ���ڴ��ʱ���ܻ�þ���
            if (game.ninja.health > 0) {
              setExp((e) => {
                const newExp = e + 10;
                if (newExp >= expToNextLevel) {
                  handleLevelUp();
                  return 0;
                }
                return newExp;
              });
            }

            game.ninja.combo++;
            setCombo(game.ninja.combo);
            setMaxCombo((mc) => Math.max(mc, game.ninja.combo));
            return false;
          }
        }

        // ��ײ��⣨ֻ���ͬһ��ĵ��ˣ�
        if (
          !game.ninja.isAttacking &&
          !game.ninja.invincible &&
          enemy.side === (game.ninja.onTopSide ? "top" : "bottom") &&
          game.ninja.x < enemy.x + enemy.width &&
          game.ninja.x + game.ninja.width > enemy.x &&
          game.ninja.y + 10 < enemy.y + enemy.height &&
          game.ninja.y + game.ninja.height > enemy.y
        ) {
          // �ܵ��˺�
          game.ninja.health -= 15;
          setHealth(game.ninja.health);
          game.ninja.invincible = true;
          game.ninja.invincibleTime = 60;

          // ��������
          game.ninja.combo = 0;
          setCombo(0);

          // �����˺���Ч
          for (let i = 0; i < 10; i++) {
            game.particles.push({
              x: game.ninja.x + 20,
              y: game.ninja.y + 30,
              vx: (Math.random() - 0.5) * 8,
              vy: (Math.random() - 0.5) * 8,
              life: 30,
              type: "damage",
            });
          }

          // ����Ƿ�����
          if (game.ninja.health <= 0) {
            game.ninja.health = 0;
            setHealth(0);
            setGameState("gameOver");
            if (score > highScore) {
              setHighScore(score);
            }
            savePlayerData(); // �����������
            return false; // �����Ƴ����˲�ֹͣ����
          }
        }

        return enemy.x > -enemy.width;
      });

      // ���ºͻ��ƽ�ң��޺��ң�
      game.coins = game.coins.filter((coin) => {
        coin.x -= game.speed;
        if (game.ninja.coinMagnet) {
          const targetX = game.ninja.x + game.ninja.width / 2 - 10;
          const targetY = game.ninja.y + game.ninja.height / 2 - 10;
          const dx = targetX - coin.x;
          const dy = targetY - coin.y;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = Math.min(10, dist) * 0.35;
          coin.x += (dx / dist) * pull;
          coin.y += (dy / dist) * pull;
        }

        // ���ƽ�һ���ʯ
        if (coin.isGem) {
          // ��ʯ�����������
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#00ffff";
          ctx.fillStyle = "#00ffff";
          ctx.save();
          ctx.translate(coin.x + 10, coin.y + 10);
          ctx.rotate(game.frameCount * 0.05 * (Math.PI / 180));
          ctx.beginPath();
          ctx.moveTo(0, -10);
          ctx.lineTo(7, 0);
          ctx.lineTo(0, 10);
          ctx.lineTo(-7, 0);
          ctx.closePath();
          ctx.fill();
          ctx.strokeStyle = "#ffffff";
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.restore();
          ctx.shadowBlur = 0;
        } else {
          // ��ͨ���
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#FFD700";
          ctx.fillStyle = "#FFD700";
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = "#FFA500";
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 8, 0, Math.PI * 2);
          ctx.stroke();
          ctx.shadowBlur = 0;

          // ������ı��
          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(coin.x + 10, coin.y + 10, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        // �ռ����
        if (
          !coin.collected &&
          game.ninja.x < coin.x + coin.width &&
          game.ninja.x + game.ninja.width > coin.x &&
          game.ninja.y < coin.y + coin.height &&
          game.ninja.y + game.ninja.height > coin.y
        ) {
          coin.collected = true;

          // ��ʯ�����ཱ��
          if (coin.isGem) {
            setScore((s) => s + 20);
            setGems((g) => g + 1);

            // ��ʯ�ռ���Ч
            for (let i = 0; i < 15; i++) {
              game.particles.push({
                x: coin.x + 10,
                y: coin.y + 10,
                vx: Math.cos((i * Math.PI) / 7.5) * 4,
                vy: Math.sin((i * Math.PI) / 7.5) * 4,
                life: 30,
                type: "gem",
              });
            }
          } else {
            setScore((s) => s + 5);
            setCoins((c) => c + 1);
          }

          // ֻ���ڴ��ʱ���ܻ�þ���
          if (game.ninja.health > 0) {
            setExp((e) => {
              const newExp = e + (coin.isGem ? 5 : 2);
              if (newExp >= expToNextLevel) {
                handleLevelUp();
                return 0;
              }
              return newExp;
            });
          }

          // �ָ���������
          if (game.ninja.ninjutsu < game.ninja.maxNinjutsu) {
            game.ninja.ninjutsu = Math.min(
              game.ninja.maxNinjutsu,
              game.ninja.ninjutsu + 10,
            );
            setNinjutsu(game.ninja.ninjutsu);
          }
          return false;
        }

        return coin.x > -coin.width;
      });

      // ���ºͻ������ư�
      game.healthPacks = game.healthPacks.filter((pack) => {
        pack.x -= game.speed;

        // �������ư�����ʮ�֣�
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#ff0000";

        // ����Բ
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(pack.x + 12, pack.y + 12, 12, 0, Math.PI * 2);
        ctx.fill();

        // ��ʮ��
        ctx.fillStyle = "#ff0000";
        ctx.fillRect(pack.x + 9, pack.y + 5, 6, 14);
        ctx.fillRect(pack.x + 5, pack.y + 9, 14, 6);

        ctx.shadowBlur = 0;

        // �ռ����
        if (
          !pack.collected &&
          game.ninja.x < pack.x + pack.width &&
          game.ninja.x + game.ninja.width > pack.x &&
          game.ninja.y < pack.y + pack.height &&
          game.ninja.y + game.ninja.height > pack.y
        ) {
          pack.collected = true;
          // �ָ�Ѫ��
          game.ninja.health = Math.min(
            game.ninja.maxHealth,
            game.ninja.health + 30,
          );
          setHealth(game.ninja.health);
          setScore((s) => s + 20);

          // ֻ���ڴ��ʱ���ܻ�þ���
          if (game.ninja.health > 0) {
            setExp((e) => {
              const newExp = e + 15;
              if (newExp >= expToNextLevel) {
                handleLevelUp();
                return 0;
              }
              return newExp;
            });
          }

          return false;
        }

        return pack.x > -pack.width;
      });

      // ���ºͻ���������Ч
      game.particles = game.particles.filter((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life--;

        if (particle.type === "fireball") {
          // ������Ч���޺���棩
          const alpha = particle.life / 60;

          ctx.shadowBlur = 20;
          ctx.shadowColor = "#ff4500";
          ctx.fillStyle = `rgba(255, 69, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 10, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 140, 0, ${alpha * 0.8})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.6})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // ���򹥻����˺��ϰ���
          if (particle.damage) {
            // ��������
            game.enemies.forEach((enemy, index) => {
              if (
                particle.x > enemy.x &&
                particle.x < enemy.x + enemy.width &&
                particle.y > enemy.y &&
                particle.y < enemy.y + enemy.height
              ) {
                game.enemies.splice(index, 1);
                particle.damage = false;
                setScore((s) => s + 15);

                // ֻ���ڴ��ʱ���ܻ�þ���
                if (game.ninja.health > 0) {
                  setExp((e) => {
                    const newExp = e + 10;
                    if (newExp >= expToNextLevel) {
                      handleLevelUp();
                      return 0;
                    }
                    return newExp;
                  });
                }

                game.ninja.combo++;
                setCombo(game.ninja.combo);
                setMaxCombo((mc) => Math.max(mc, game.ninja.combo));
              }
            });

            // �����ϰ���
            game.obstacles.forEach((obstacle, index) => {
              if (
                particle.x > obstacle.x &&
                particle.x < obstacle.x + obstacle.width &&
                particle.y > obstacle.y &&
                particle.y < obstacle.y + obstacle.height
              ) {
                game.obstacles.splice(index, 1);
                particle.damage = false;
                setScore((s) => s + 5);

                // ������ը��Ч
                for (let i = 0; i < 8; i++) {
                  game.particles.push({
                    x: obstacle.x + obstacle.width / 2,
                    y: obstacle.y + obstacle.height / 2,
                    vx: Math.cos((i * Math.PI) / 4) * 5,
                    vy: Math.sin((i * Math.PI) / 4) * 5,
                    life: 20,
                    type: "explosion",
                  });
                }
              }
            });
          }
        } else if (particle.type === "damage") {
          // �˺���Ч����ɫ���ӣ�
          const alpha = particle.life / 30;
          ctx.fillStyle = `rgba(255, 0, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (particle.type === "explosion") {
          // ��ը��Ч����ɫ���ӣ�
          const alpha = particle.life / 20;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ff8c00";
          ctx.fillStyle = `rgba(255, 140, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (particle.type === "gem") {
          // ��ʯ�ռ���Ч����ɫ���ӣ�
          const alpha = particle.life / 30;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#00ffff";
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (particle.type === "shadow") {
          // ��Ӱ���ӣ���ɫ��
          const alpha = particle.life / 40;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#8b00ff";
          ctx.fillStyle = `rgba(139, 0, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 5, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (particle.type === "ice") {
          // ��˪���ӣ���ɫ��
          const alpha = particle.life / 60;
          ctx.shadowBlur = 12;
          ctx.shadowColor = "#00ffff";
          ctx.fillStyle = `rgba(0, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (particle.type === "gold") {
          // ��ɫ����
          const alpha = particle.life / 80;
          ctx.shadowBlur = 15;
          ctx.shadowColor = "#ffd700";
          ctx.fillStyle = `rgba(255, 215, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        } else if (particle.type === "dragon") {
          // �������ӣ��Ϻ�ɫ��
          const alpha = particle.life / 60;
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#ff00ff";
          ctx.fillStyle = `rgba(255, 0, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 8, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;

          // ��������Ҳ�ܹ���
          if (particle.damage) {
            game.enemies.forEach((enemy, index) => {
              if (
                particle.x > enemy.x &&
                particle.x < enemy.x + enemy.width &&
                particle.y > enemy.y &&
                particle.y < enemy.y + enemy.height
              ) {
                game.enemies.splice(index, 1);
                particle.damage = false;
                setScore((s) => s + 20);
                game.ninja.combo++;
                setCombo(game.ninja.combo);
              }
            });
          }
        } else if (particle.type === "thunder") {
          // �׵����ӣ���ɫ���磩
          const alpha = particle.life / 30;
          ctx.shadowBlur = 20;
          ctx.shadowColor = "#ffff00";
          ctx.fillStyle = `rgba(255, 255, 0, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.shadowBlur = 0;
        } else if (particle.type === "clone") {
          // �������ӣ���ɫ��
          const alpha = particle.life / 60;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ffffff";
          ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, 4, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        return particle.life > 0;
      });

      // ���ӷ����;��飨�����ӳɣ�
      if (game.frameCount % 10 === 0) {
        const comboBonus = Math.floor(game.ninja.combo / 5);
        setScore((s) => s + 1 + comboBonus);
        setTotalDistance((d) => d + 1);

        // ֻ���ڴ��ʱ���ܻ�þ���
        if (game.ninja.health > 0) {
          setExp((e) => {
            const newExp = e + 1;
            // ����Ƿ�����
            if (newExp >= expToNextLevel) {
              handleLevelUp();
              return 0;
            }
            return newExp;
          });
        }
      }

      // ������˥��
      if (game.frameCount % 120 === 0 && game.ninja.combo > 0) {
        game.ninja.combo = Math.max(0, game.ninja.combo - 1);
        setCombo(game.ninja.combo);
      }

      // �����Ѷȣ���ƽ����
      if (game.frameCount % 600 === 0 && game.speed < 8) {
        game.speed += 0.2;
      }

      // ��ʾ�ٶ�������ʾ
      if (game.frameCount % 600 === 1 && game.speed < 8) {
        // ��������ٶ��������Ӿ�����
      }

      animationId = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [gameState, score, highScore]);

  return (
    <div className="game-container">
      {gameState === "shop" && (
        <div className="shop-screen">
          <div className="shop-content">
            <button className="close-btn" onClick={() => setGameState("menu")}>
              <CloseIcon size={18} />
            </button>
            <h2>
              <ShopIcon
                size={28}
                style={{ verticalAlign: "middle", marginRight: 10 }}
              />{" "}
              SHOP
            </h2>

            <div className="shop-tabs">
              <button
                className={`shop-tab ${shopTab === "items" ? "active" : ""}`}
                onClick={() => setShopTab("items")}
              >
                <HealthPotionIcon
                  size={22}
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                />{" "}
                Items
              </button>
              <button
                className={`shop-tab ${shopTab === "ninjas" ? "active" : ""}`}
                onClick={() => setShopTab("ninjas")}
              >
                <DefaultNinjaIcon
                  size={22}
                  style={{ verticalAlign: "middle", marginRight: 8 }}
                />{" "}
                Ninjas
              </button>
            </div>

            <div className="shop-resources">
              <div className="resource-display">
                <span className="icon">
                  <GemIcon size={22} />
                </span>
                <span>{gems}</span>
              </div>
              <div className="resource-display">
                <span className="icon">
                  <CoinIcon size={22} />
                </span>
                <span>{coins}</span>
              </div>
            </div>

            <div className="shop-items">
              {shopTab === "items" && (
                <>
                  <div className="shop-item">
                    <div className="item-icon">
                      <HealthPotionIcon size={40} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">Health Potion</div>
                      <div className="item-desc">Restore 50 HP</div>
                    </div>
                    <button
                      className="buy-btn"
                      onClick={() =>
                        openPurchaseModal({
                          type: "item",
                          title: "Health Potion",
                          description: "Restore 50 HP",
                          icon: <HealthPotionIcon size={44} />,
                          price: 200,
                          currency: "coins",
                          effect: () => {},
                        })
                      }
                    >
                      <span className="icon">
                        <CoinIcon size={18} />
                      </span>{" "}
                      200
                    </button>
                  </div>

                  <div className="shop-item">
                    <div className="item-icon">
                      <QuestionIcon size={40} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">Energy Pack</div>
                      <div className="item-desc">+5 Energy</div>
                    </div>
                    <button
                      className="buy-btn"
                      onClick={() =>
                        openPurchaseModal({
                          type: "item",
                          title: "Energy Pack",
                          description: "+5 Energy",
                          icon: null,
                          price: 100,
                          currency: "coins",
                          effect: () => setEnergy(energy + 5),
                        })
                      }
                    >
                      <span className="icon">
                        <CoinIcon size={18} />
                      </span>{" "}
                      100
                    </button>
                  </div>

                  <div className="shop-item">
                    <div className="item-icon">
                      <CoinIcon size={36} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">Coin Pack</div>
                      <div className="item-desc">+1000 Coins</div>
                    </div>
                    <button
                      className="buy-btn"
                      onClick={() =>
                        openPurchaseModal({
                          type: "item",
                          title: "Coin Pack",
                          description: "+1000 Coins",
                          icon: <CoinIcon size={40} />,
                          price: 50,
                          currency: "gems",
                          effect: () => setCoins(coins + 1000),
                        })
                      }
                    >
                      <span className="icon">
                        <GemIcon size={18} />
                      </span>{" "}
                      50
                    </button>
                  </div>

                  <div className="shop-item">
                    <div className="item-icon">
                      <QuestionIcon size={40} />
                    </div>
                    <div className="item-info">
                      <div className="item-name">Reset Progress</div>
                      <div className="item-desc">Clear all saved data</div>
                    </div>
                    <button
                      className="buy-btn reset-btn"
                      onClick={() => setShowResetConfirm(true)}
                    >
                      <span className="icon">
                        <QuestionIcon size={18} />
                      </span>{" "}
                      RESET
                    </button>
                  </div>
                </>
              )}

              {shopTab === "ninjas" && (
                <>
                  {Object.entries(skins).map(([key, skin]) => (
                    <div key={key} className="shop-item ninja-item">
                      <div
                        className="item-icon ninja-icon"
                        style={{ fontSize: "3rem" }}
                      >
                        {skin.emoji}
                      </div>
                      <div className="item-info">
                        <div className="item-name">{skin.name}</div>
                        <div className="item-desc">{skin.skillDesc}</div>
                        <div className="ninja-skill-name">
                          <QuestionIcon
                            size={16}
                            style={{ verticalAlign: "middle", marginRight: 8 }}
                          />{" "}
                          {skin.skill}
                        </div>
                        <div className="ninja-skill-cost">
                          Cost: {skin.skillCost} Energy
                        </div>
                      </div>
                      {!ownedSkins.includes(key) ? (
                        <button
                          className="buy-btn"
                          onClick={() =>
                            openPurchaseModal({
                              type: "ninja",
                              key: key,
                              skin: skin,
                              title: skin.name,
                              description: skin.skillDesc,
                              icon: skin.emoji,
                              skill: skin.skill,
                              skillCost: skin.skillCost,
                              price: skin.price,
                              currency: "gems",
                            })
                          }
                        >
                          <span className="icon">
                            <GemIcon size={18} />
                          </span>{" "}
                          {skin.price}
                        </button>
                      ) : selectedSkin === key ? (
                        <button className="buy-btn equipped-btn" disabled>
                          <span className="icon">
                            <QuestionIcon size={18} />
                          </span>{" "}
                          EQUIPPED
                        </button>
                      ) : (
                        <button
                          className="buy-btn select-btn"
                          onClick={() => {
                            setSelectedSkin(key);
                            savePlayerData();
                            showNotif(`${skin.name} equipped!`, "success");
                          }}
                        >
                          <span className="icon">
                            <QuestionIcon size={18} />
                          </span>{" "}
                          EQUIP
                        </button>
                      )}
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {gameState === "menu" && (
        <div className="main-menu">
          {/* 背景大月亮 */}
          <div className="moon-background"></div>

          {/* 顶部左侧玩家卡片 */}
          <div className="player-card">
            <div className="player-card-avatar">
              {skins[selectedSkin].emoji}
            </div>
            <div className="player-card-info">
              <div className="player-card-name">Ninja</div>
              <div className="player-card-level">Level {level}</div>
              <div className="player-card-power">
                Power {maxHealth + ninjaUpgradeLevel * 100}
              </div>
            </div>
          </div>

          {/* 顶部右侧资源栏 */}
          <div className="resources-bar">
            <div className="resource-badge coins">
              <span className="resource-icon">
                <CoinIcon size={20} />
              </span>
              <span className="resource-value">{coins}</span>
            </div>
            <div className="resource-badge gems">
              <span className="resource-icon">
                <GemIcon size={20} />
              </span>
              <span className="resource-value">{gems}</span>
            </div>
            <div className="resource-badge energy">
              <span className="resource-icon">⚡</span>
              <span className="resource-value">{energy}</span>
            </div>
          </div>

          {/* 中央角色展示区 */}
          <div className="character-showcase">
            <div className="showcase-character">
              <div className="character-model">{skins[selectedSkin].emoji}</div>
              <div className="character-platform"></div>
            </div>
            <div className="showcase-info">
              <div className="character-title">{skins[selectedSkin].name}</div>
              <div className="character-skill">
                <span className="skill-icon">🎯</span>
                <span className="skill-text">{skins[selectedSkin].skill}</span>
              </div>
              <div className="character-attributes">
                <div className="attribute-item">
                  <span className="attr-label">Max HP</span>
                  <span className="attr-value">{maxHealth}</span>
                </div>
                <div className="attribute-item">
                  <span className="attr-label">Skill CD</span>
                  <span className="attr-value">
                    {(getSkillCooldownTime() / 60).toFixed(1)}s
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 左侧菜单按钮 */}
          <div className="side-menu-left">
            <button
              className="side-menu-btn shop-btn"
              onClick={() => setGameState("shop")}
            >
              <span className="btn-icon">
                <ShopIcon size={28} />
              </span>
              <span className="btn-text">Shop</span>
            </button>
            <button
              className="side-menu-btn upgrade-btn"
              onClick={() => {
                openPurchaseModal({
                  type: "upgrade",
                  title: "Upgrade Ninja",
                  description: `Upgrade to Level ${ninjaUpgradeLevel + 1}`,
                  benefits: ["+20 Max HP", "-0.5s Skill Cooldown"],
                  price: ninjaUpgradeLevel * 1000,
                  currency: "coins",
                });
              }}
            >
              <span className="btn-icon">⬆️</span>
              <span className="btn-text">Upgrade</span>
            </button>
          </div>

          {/* 底部经验条 */}
          <div className="exp-progress-bar">
            <div className="exp-icons">
              <span className="exp-icon">⭐</span>
              <span className="exp-icon">⭐</span>
              <span className="exp-icon">⭐</span>
            </div>
            <div className="exp-bar-container">
              <div className="exp-bar-label">
                <span className="exp-label-text">Experience</span>
                <span className="exp-percentage">
                  {Math.floor((exp / expToNextLevel) * 100)}%
                </span>
              </div>
              <div className="exp-bar-track">
                <div
                  className="exp-bar-fill"
                  style={{ width: `${(exp / expToNextLevel) * 100}%` }}
                />
              </div>
              <div className="exp-values">
                <span>{exp}</span>
                <span>/</span>
                <span>{expToNextLevel}</span>
              </div>
            </div>
            <div className="exp-icons">
              <span className="exp-icon">⭐</span>
              <span className="exp-icon">⭐</span>
              <span className="exp-icon">⭐</span>
            </div>
          </div>

          {/* 底部开始按钮 */}
          <div className="start-battle-container">
            <button
              className="start-battle-btn"
              onClick={showDifficultySelection}
            >
              <span className="battle-icon">⚔️</span>
              <span className="battle-text">Start Battle</span>
            </button>
          </div>
        </div>
      )}

      {(gameState === "playing" || gameState === "paused") && (
        <>
          <div className="fullscreen-game">
            <canvas
              ref={canvasRef}
              width={window.innerWidth}
              height={window.innerHeight - 150}
              className="game-canvas-fullscreen"
            />

            {/* ��ϷUI���ǲ� */}
            <div className="game-ui-overlay">
              <div className="ui-top">
                <div className="level-display">
                  <span className="level-text">Lv.{level}</span>
                  <div className="exp-bar-game">
                    <div
                      className="exp-fill-game"
                      style={{ width: `${(exp / expToNextLevel) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="score-display">SCORE: {score}</div>
                <div className="combo-display">COMBO: {combo}x</div>
                <div className="health-display">
                  <span>
                    HEALTH: {health}/{maxHealth}
                  </span>
                  <div className="health-bar">
                    <div
                      className="health-fill"
                      style={{
                        width: `${(health / maxHealth) * 100}%`,
                        backgroundColor:
                          health / maxHealth > 0.5
                            ? "#00ff00"
                            : health / maxHealth > 0.25
                              ? "#ffaa00"
                              : "#ff0000",
                      }}
                    />
                  </div>
                </div>
                <div className="ninjutsu-display">
                  <span>ENERGY: {ninjutsu}/100</span>
                  <div className="energy-bar">
                    <div
                      className="energy-fill"
                      style={{ width: `${ninjutsu}%` }}
                    />
                  </div>
                  {skillCooldown > 0 && (
                    <div className="cooldown-text">
                      Cooldown: {(skillCooldown / 60).toFixed(1)}s
                    </div>
                  )}
                </div>
                <button
                  className="pause-btn"
                  onClick={() =>
                    setGameState(gameState === "playing" ? "paused" : "playing")
                  }
                >
                  {gameState === "playing" ? (
                    <PauseIcon size={18} />
                  ) : (
                    <PlayIcon size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* ��ͣ���� */}
            {gameState === "paused" && (
              <div className="pause-overlay">
                <div className="pause-content">
                  <h2>
                    <PauseIcon
                      size={22}
                      style={{ verticalAlign: "middle", marginRight: 10 }}
                    />{" "}
                    PAUSED
                  </h2>
                  <div className="pause-buttons">
                    <button
                      className="resume-btn"
                      onClick={() => setGameState("playing")}
                    >
                      <PlayIcon
                        size={18}
                        style={{ verticalAlign: "middle", marginRight: 10 }}
                      />{" "}
                      RESUME
                    </button>
                    <button
                      className="quit-btn"
                      onClick={() => {
                        setCoins((c) => c + Math.floor(score / 10));
                        setGems((g) => g + Math.floor(score / 50));
                        setMaxCombo(0);
                        setTotalDistance(0);
                        savePlayerData(); // �����������
                        setGameState("menu");
                      }}
                    >
                      <CloseIcon
                        size={18}
                        style={{ verticalAlign: "middle", marginRight: 10 }}
                      />{" "}
                      QUIT TO MENU
                    </button>
                  </div>
                  <div className="pause-tips">
                    <p>TIPS:</p>
                    <p>• Press ESC to pause/resume</p>
                    <p>
                      • Collect{" "}
                      <HealthPotionIcon
                        size={16}
                        style={{ verticalAlign: "middle", margin: "0 6px" }}
                      />{" "}
                      to restore health
                    </p>
                    <p>• Use FLIP to avoid obstacles</p>
                    <p>• Build combos for higher scores!</p>
                  </div>
                </div>
              </div>
            )}

            {/* 底部控制按钮 */}
            {gameState === "playing" && (
              <div className="game-controls">
                <button
                  className="control-btn flip-btn"
                  onTouchStart={() => (gameRef.current.keys["s"] = true)}
                  onTouchEnd={() => (gameRef.current.keys["s"] = false)}
                  onMouseDown={() => (gameRef.current.keys["s"] = true)}
                  onMouseUp={() => (gameRef.current.keys["s"] = false)}
                >
                  <span className="btn-icon">🔄</span>
                  <span className="btn-label">FLIP</span>
                  <span className="btn-key">S</span>
                </button>

                <button
                  className="control-btn skill-btn"
                  onTouchStart={() => (gameRef.current.keys["z"] = true)}
                  onTouchEnd={() => (gameRef.current.keys["z"] = false)}
                  onMouseDown={() => (gameRef.current.keys["z"] = true)}
                  onMouseUp={() => (gameRef.current.keys["z"] = false)}
                  disabled={
                    skillCooldown > 0 ||
                    ninjutsu < skins[selectedSkin].skillCost
                  }
                  style={{
                    opacity:
                      skillCooldown > 0 ||
                      ninjutsu < skins[selectedSkin].skillCost
                        ? 0.5
                        : 1,
                  }}
                >
                  <span className="btn-icon">{skins[selectedSkin].emoji}</span>
                  <span className="btn-label">{skins[selectedSkin].skill}</span>
                  {skillCooldown > 0 ? (
                    <span className="btn-cost">
                      {(skillCooldown / 60).toFixed(1)}s
                    </span>
                  ) : (
                    <span className="btn-cost">
                      -{skins[selectedSkin].skillCost} Energy
                    </span>
                  )}
                </button>
              </div>
            )}
          </div>
        </>
      )}

      {gameState === "gameOver" && (
        <div className="game-over-screen">
          <div className="game-over-content">
            <h2>MISSION COMPLETE!</h2>
            <div className="final-score">
              <div className="score-item">
                <span className="label">SCORE</span>
                <span className="value">{score}</span>
              </div>
              <div className="score-item">
                <span className="label">BEST</span>
                <span className="value">{highScore}</span>
              </div>
              <div className="score-item">
                <span className="label">MAX COMBO</span>
                <span className="value">{maxCombo}x</span>
              </div>
              <div className="score-item">
                <span className="label">DISTANCE</span>
                <span className="value">{totalDistance}m</span>
              </div>
              <div className="score-item">
                <span className="label">COINS</span>
                <span className="value">+{Math.floor(score / 10)}</span>
              </div>
              <div className="score-item">
                <span className="label">GEMS</span>
                <span className="value">+{Math.floor(score / 50)}</span>
              </div>
            </div>
            <div className="game-over-buttons">
              <button
                className="retry-btn"
                onClick={() => {
                  setCoins((c) => c + Math.floor(score / 10));
                  setGems((g) => g + Math.floor(score / 50));
                  setMaxCombo(0);
                  setTotalDistance(0);
                  savePlayerData(); // �����������
                  startGame();
                }}
              >
                <span>
                  <PlayIcon
                    size={18}
                    style={{ verticalAlign: "middle", marginRight: 10 }}
                  />{" "}
                  RETRY
                </span>
              </button>
              <button
                className="menu-btn"
                onClick={() => {
                  setCoins((c) => c + Math.floor(score / 10));
                  setGems((g) => g + Math.floor(score / 50));
                  setMaxCombo(0);
                  setTotalDistance(0);
                  savePlayerData(); // �����������
                  setGameState("menu");
                }}
              >
                <span>
                  <CloseIcon
                    size={18}
                    style={{ verticalAlign: "middle", marginRight: 10 }}
                  />{" "}
                  MAIN MENU
                </span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ����ȷ�ϵ��� */}
      {showPurchaseModal && purchaseData && (
        <div className="purchase-modal-overlay" onClick={closePurchaseModal}>
          <div className="purchase-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={closePurchaseModal}>
              <CloseIcon size={18} />
            </button>

            <div className="modal-header">
              {purchaseData.icon && (
                <div className="modal-icon">{purchaseData.icon}</div>
              )}
              <h2 className="modal-title">{purchaseData.title}</h2>
            </div>

            <div className="modal-body">
              <p className="modal-description">{purchaseData.description}</p>

              {purchaseData.skill && (
                <div className="modal-skill-info">
                  <div className="modal-skill-name">
                    <QuestionIcon
                      size={16}
                      style={{ verticalAlign: "middle", marginRight: 8 }}
                    />{" "}
                    {purchaseData.skill}
                  </div>
                  <div className="modal-skill-cost">
                    Energy Cost: {purchaseData.skillCost}
                  </div>
                </div>
              )}

              {purchaseData.benefits && (
                <div className="modal-benefits">
                  <div className="benefits-title">Benefits:</div>
                  {purchaseData.benefits.map((benefit, index) => (
                    <div key={index} className="benefit-item">
                      • {benefit}
                    </div>
                  ))}
                </div>
              )}

              <div className="modal-price">
                <span className="price-label">Price:</span>
                <span className="price-value">
                  {purchaseData.currency === "coins" ? (
                    <CoinIcon size={18} />
                  ) : (
                    <GemIcon size={18} />
                  )}{" "}
                  {purchaseData.price}
                </span>
              </div>

              <div className="modal-balance">
                <span className="balance-label">Your Balance:</span>
                <span
                  className={`balance-value ${
                    (purchaseData.currency === "coins" ? coins : gems) >=
                    purchaseData.price
                      ? "sufficient"
                      : "insufficient"
                  }`}
                >
                  {purchaseData.currency === "coins" ? (
                    <CoinIcon size={18} />
                  ) : (
                    <GemIcon size={18} />
                  )}
                  {purchaseData.currency === "coins" ? coins : gems}
                </span>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={closePurchaseModal}
              >
                Cancel
              </button>
              <button
                className="modal-btn confirm-btn"
                onClick={confirmPurchase}
                disabled={
                  (purchaseData.currency === "coins" ? coins : gems) <
                  purchaseData.price
                }
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ֪ͨ��ʾ */}
      {showNotification && (
        <div className={`notification ${notificationType}`}>
          <span className="notification-icon">
            {notificationType === "success" && <PlayIcon size={16} />}
            {notificationType === "error" && <CloseIcon size={16} />}
            {notificationType === "info" && <QuestionIcon size={16} />}
          </span>
          <span className="notification-message">{notificationMessage}</span>
        </div>
      )}

      {/* 难度选择弹窗 */}
      {showDifficultyModal && (
        <div
          className="purchase-modal-overlay"
          onClick={() => setShowDifficultyModal(false)}
        >
          <div
            className="difficulty-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowDifficultyModal(false)}
            >
              ✕
            </button>

            <div className="modal-header">
              <div className="modal-icon">🎯</div>
              <h2 className="modal-title">Select Difficulty</h2>
            </div>

            <div className="modal-body">
              <p className="modal-description">
                Choose your challenge level - higher difficulty means better
                rewards!
              </p>

              <div className="difficulty-options">
                <div
                  className={`difficulty-option easy ${selectedDifficulty === "easy" ? "selected" : ""}`}
                  onClick={() => setSelectedDifficulty("easy")}
                >
                  <div className="difficulty-icon">😊</div>
                  <div className="difficulty-name">Easy</div>
                  <div className="difficulty-desc">For Beginners</div>
                  <div className="difficulty-stats">
                    <div className="stat">Speed: Slow</div>
                    <div className="stat">Rewards: ×0.8</div>
                  </div>
                </div>

                <div
                  className={`difficulty-option normal ${selectedDifficulty === "normal" ? "selected" : ""}`}
                  onClick={() => setSelectedDifficulty("normal")}
                >
                  <div className="difficulty-icon">😎</div>
                  <div className="difficulty-name">Normal</div>
                  <div className="difficulty-desc">Balanced</div>
                  <div className="difficulty-stats">
                    <div className="stat">Speed: Medium</div>
                    <div className="stat">Rewards: ×1.0</div>
                  </div>
                </div>

                <div
                  className={`difficulty-option hard ${selectedDifficulty === "hard" ? "selected" : ""}`}
                  onClick={() => setSelectedDifficulty("hard")}
                >
                  <div className="difficulty-icon">😤</div>
                  <div className="difficulty-name">Hard</div>
                  <div className="difficulty-desc">Expert Challenge</div>
                  <div className="difficulty-stats">
                    <div className="stat">Speed: Fast</div>
                    <div className="stat">Rewards: ×1.5</div>
                  </div>
                </div>

                <div
                  className={`difficulty-option extreme ${selectedDifficulty === "extreme" ? "selected" : ""}`}
                  onClick={() => setSelectedDifficulty("extreme")}
                >
                  <div className="difficulty-icon">🔥</div>
                  <div className="difficulty-name">Extreme</div>
                  <div className="difficulty-desc">Ultimate Test</div>
                  <div className="difficulty-stats">
                    <div className="stat">Speed: Very Fast</div>
                    <div className="stat">Rewards: ×2.0</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setShowDifficultyModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn confirm-btn"
                onClick={() => startGame(selectedDifficulty)}
              >
                Start Game
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ����ȷ�ϵ��� */}
      {showResetConfirm && (
        <div
          className="purchase-modal-overlay"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="purchase-modal reset-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setShowResetConfirm(false)}
            >
              <CloseIcon size={18} />
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <QuestionIcon size={22} />
              </div>
              <h2 className="modal-title">Reset Progress</h2>
            </div>

            <div className="modal-body">
              <p
                className="modal-description"
                style={{ color: "#ff0000", fontWeight: "bold" }}
              >
                Are you sure you want to reset ALL progress?
              </p>
              <p className="modal-description">This will delete:</p>
              <div className="modal-benefits">
                <div className="benefit-item" style={{ color: "#ff6666" }}>
                  ? All purchased ninjas
                </div>
                <div className="benefit-item" style={{ color: "#ff6666" }}>
                  ? All coins and gems
                </div>
                <div className="benefit-item" style={{ color: "#ff6666" }}>
                  ? All upgrades and levels
                </div>
                <div className="benefit-item" style={{ color: "#ff6666" }}>
                  ? High scores and stats
                </div>
              </div>
              <p
                className="modal-description"
                style={{ color: "#ffaa00", fontWeight: "bold" }}
              >
                This action CANNOT be undone!
              </p>
            </div>

            <div className="modal-footer">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn confirm-btn"
                style={{
                  background:
                    "linear-gradient(135deg, #ff0000 0%, #cc0000 100%)",
                }}
                onClick={() => {
                  localStorage.clear();
                  window.location.reload();
                }}
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
