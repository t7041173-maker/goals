import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import {
  Target,
  Home,
  GraduationCap,
  Car,
  Plane,
  Heart,
  Baby,
  Plus,
  Calendar,
  DollarSign,
  TrendingUp,
  X,
  CheckCircle,
  IndianRupee,
  Users,
  Briefcase,
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Goals() {
  const [modalVisible, setModalVisible] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    amount: '',
    targetDate: '',
    category: 'house',
  });

  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Buy Dream House in Bangalore',
      targetAmount: 8000000,
      currentAmount: 2500000,
      targetDate: '2027-06-15',
      category: 'house',
      monthlyTarget: 114583,
      progress: 31,
    },
    {
      id: 2,
      title: 'Wedding Expenses',
      targetAmount: 1500000,
      currentAmount: 450000,
      targetDate: '2025-12-01',
      category: 'wedding',
      monthlyTarget: 52500,
      progress: 30,
    },
    {
      id: 3,
      title: 'Emergency Fund (6 months)',
      targetAmount: 500000,
      currentAmount: 400000,
      targetDate: '2024-08-01',
      category: 'emergency',
      monthlyTarget: 16667,
      progress: 80,
    },
    {
      id: 4,
      title: 'Child Education Fund',
      targetAmount: 2500000,
      currentAmount: 125000,
      targetDate: '2035-06-01',
      category: 'education',
      monthlyTarget: 18056,
      progress: 5,
    },
  ]);

  const goalCategories = [
    { id: 'house', name: 'House', icon: Home, color: '#2563EB' },
    { id: 'wedding', name: 'Wedding', icon: Heart, color: '#EC4899' },
    {
      id: 'education',
      name: 'Education',
      icon: GraduationCap,
      color: '#7C3AED',
    },
    { id: 'car', name: 'Car', icon: Car, color: '#059669' },
    { id: 'vacation', name: 'Vacation', icon: Plane, color: '#F59E0B' },
    { id: 'baby', name: 'Baby', icon: Baby, color: '#EF4444' },
    { id: 'emergency', name: 'Emergency', icon: Target, color: '#06B6D4' },
    { id: 'retirement', name: 'Retirement', icon: Briefcase, color: '#8B5CF6' },
  ];

  const addGoal = () => {
    if (!newGoal.title || !newGoal.amount || !newGoal.targetDate) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    const targetAmount = parseFloat(newGoal.amount);
    const targetDate = new Date(newGoal.targetDate);
    const currentDate = new Date();
    const monthsRemaining = Math.max(
      1,
      Math.ceil((targetDate - currentDate) / (1000 * 60 * 60 * 24 * 30))
    );
    const monthlyTarget = Math.ceil(targetAmount / monthsRemaining);

    const goal = {
      id: Date.now(),
      title: newGoal.title,
      targetAmount,
      currentAmount: 0,
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      monthlyTarget,
      progress: 0,
    };

    setGoals([...goals, goal]);
    setModalVisible(false);
    setNewGoal({ title: '', amount: '', targetDate: '', category: 'house' });
    Alert.alert('Success!', 'Your financial goal has been added successfully!');
  };

  const getCategoryInfo = (categoryId) => {
    return (
      goalCategories.find((cat) => cat.id === categoryId) || goalCategories[0]
    );
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  // Indian life milestones with realistic costs
  const lifeMilestones = [
    {
      title: 'Emergency Fund',
      description: 'Build emergency fund worth 6-12 months of expenses',
      estimatedCost: '₹3-6 lakhs',
      timeframe: '1-2 years',
      priority: 'High',
    },
    {
      title: 'Marriage Planning',
      description: 'Wedding ceremony, reception, and related expenses',
      estimatedCost: '₹10-25 lakhs',
      timeframe: '2-5 years',
      priority: 'High',
    },
    {
      title: 'House Down Payment',
      description: '20-30% down payment for home purchase in metro cities',
      estimatedCost: '₹20-80 lakhs',
      timeframe: '5-10 years',
      priority: 'High',
    },
    {
      title: 'Car Purchase',
      description: 'Mid-range car for family transportation',
      estimatedCost: '₹8-15 lakhs',
      timeframe: '2-4 years',
      priority: 'Medium',
    },
    {
      title: 'Children Education',
      description: 'Higher education fund including professional courses',
      estimatedCost: '₹25-50 lakhs',
      timeframe: '15-20 years',
      priority: 'High',
    },
    {
      title: 'Retirement Corpus',
      description: 'Comfortable retirement with inflation-adjusted expenses',
      estimatedCost: '₹3-5 crores',
      timeframe: '25-35 years',
      priority: 'High',
    },
  ];

  const challenges = [
    {
      title: 'Save ₹10,000 in 30 days',
      progress: 70,
      reward: '100 XP',
      type: 'savings',
    },
    {
      title: 'Start your first SIP',
      progress: 0,
      reward: 'Investment Badge',
      type: 'investment',
    },
    {
      title: 'Complete emergency fund',
      progress: 80,
      reward: '500 XP',
      type: 'emergency',
    },
    {
      title: 'Track expenses for 60 days',
      progress: 45,
      reward: 'Budget Master',
      type: 'tracking',
    },
  ];

  const goalInsights = {
    totalGoals: goals.length,
    totalTargetAmount: goals.reduce((sum, goal) => sum + goal.targetAmount, 0),
    totalCurrentAmount: goals.reduce(
      (sum, goal) => sum + goal.currentAmount,
      0
    ),
    monthlyRequirement: goals.reduce(
      (sum, goal) => sum + goal.monthlyTarget,
      0
    ),
    averageProgress:
      goals.reduce((sum, goal) => sum + goal.progress, 0) / goals.length,
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Life Goals</Text>
            <Text style={styles.headerSubtitle}>
              Plan for your financial future
            </Text>
          </View>
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setModalVisible(true)}
          >
            <Plus size={24} color="#FFFFFF" />
          </TouchableOpacity>
        </View>

        {/* Goals Progress Overview */}
        <View style={styles.overviewCard}>
          <Text style={styles.overviewTitle}>Goals Overview</Text>
          <View style={styles.overviewStats}>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>
                {goalInsights.totalGoals}
              </Text>
              <Text style={styles.overviewStatLabel}>Active Goals</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>
                {formatCurrency(goalInsights.totalCurrentAmount)}
              </Text>
              <Text style={styles.overviewStatLabel}>Total Saved</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>
                {formatCurrency(goalInsights.monthlyRequirement)}
              </Text>
              <Text style={styles.overviewStatLabel}>Monthly Target</Text>
            </View>
            <View style={styles.overviewStat}>
              <Text style={styles.overviewStatValue}>
                {goalInsights.averageProgress.toFixed(0)}%
              </Text>
              <Text style={styles.overviewStatLabel}>Avg Progress</Text>
            </View>
          </View>
        </View>

        {/* Active Challenges */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Financial Challenges</Text>
          <View style={styles.challengesContainer}>
            {challenges.map((challenge, index) => (
              <View key={index} style={styles.challengeCard}>
                <View style={styles.challengeInfo}>
                  <Text style={styles.challengeTitle}>{challenge.title}</Text>
                  <Text style={styles.challengeReward}>
                    Reward: {challenge.reward}
                  </Text>
                </View>
                <View style={styles.challengeProgress}>
                  <Text style={styles.progressText}>{challenge.progress}%</Text>
                  <View style={styles.progressBar}>
                    <View
                      style={[
                        styles.progressFill,
                        { width: `${challenge.progress}%` },
                      ]}
                    />
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Active Goals */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Financial Goals</Text>
          {goals.map((goal) => {
            const categoryInfo = getCategoryInfo(goal.category);
            const IconComponent = categoryInfo.icon;
            const remainingAmount = goal.targetAmount - goal.currentAmount;
            const targetDate = new Date(goal.targetDate);
            const monthsRemaining = Math.max(
              1,
              Math.ceil((targetDate - new Date()) / (1000 * 60 * 60 * 24 * 30))
            );

            return (
              <View key={goal.id} style={styles.goalCard}>
                <View style={styles.goalHeader}>
                  <View style={styles.goalIcon}>
                    <IconComponent size={24} color={categoryInfo.color} />
                  </View>
                  <View style={styles.goalInfo}>
                    <Text style={styles.goalTitle}>{goal.title}</Text>
                    <Text style={styles.goalAmount}>
                      {formatCurrency(goal.currentAmount)} /{' '}
                      {formatCurrency(goal.targetAmount)}
                    </Text>
                    <Text style={styles.goalRemaining}>
                      {formatCurrency(remainingAmount)} remaining
                    </Text>
                  </View>
                  <View style={styles.goalProgress}>
                    <Text style={styles.progressPercentage}>
                      {goal.progress}%
                    </Text>
                  </View>
                </View>

                <View style={styles.progressBarContainer}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${goal.progress}%`,
                        backgroundColor: categoryInfo.color,
                      },
                    ]}
                  />
                </View>

                <View style={styles.goalDetails}>
                  <View style={styles.goalDetail}>
                    <Calendar size={16} color="#6B7280" />
                    <Text style={styles.goalDetailText}>
                      Target: {targetDate.toLocaleDateString('en-IN')}
                    </Text>
                  </View>
                  <View style={styles.goalDetail}>
                    <IndianRupee size={16} color="#6B7280" />
                    <Text style={styles.goalDetailText}>
                      {formatCurrency(goal.monthlyTarget)}/month needed
                    </Text>
                  </View>
                  <View style={styles.goalDetail}>
                    <Target size={16} color="#6B7280" />
                    <Text style={styles.goalDetailText}>
                      {monthsRemaining} months remaining
                    </Text>
                  </View>
                </View>

                <View style={styles.goalActions}>
                  <TouchableOpacity
                    style={[
                      styles.contributeButton,
                      { borderColor: categoryInfo.color },
                    ]}
                    onPress={() =>
                      Alert.alert('Add Contribution', 'Feature coming soon!')
                    }
                  >
                    <Text
                      style={[
                        styles.contributeButtonText,
                        { color: categoryInfo.color },
                      ]}
                    >
                      Add Money
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.sipButton,
                      { backgroundColor: categoryInfo.color },
                    ]}
                    onPress={() =>
                      Alert.alert(
                        'Start SIP',
                        `Start a SIP of ${formatCurrency(
                          goal.monthlyTarget
                        )} for this goal?`
                      )
                    }
                  >
                    <Text style={styles.sipButtonText}>Start SIP</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Life Milestones Guide */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Indian Life Milestones Guide</Text>
          <Text style={styles.sectionSubtitle}>
            Plan ahead for major life events with estimated costs for Indian
            families
          </Text>
          <View style={styles.milestonesContainer}>
            {lifeMilestones.map((milestone, index) => (
              <View key={index} style={styles.milestoneCard}>
                <View style={styles.milestoneHeader}>
                  <View style={styles.milestoneNumber}>
                    <Text style={styles.milestoneNumberText}>{index + 1}</Text>
                  </View>
                  <View
                    style={[
                      styles.priorityBadge,
                      {
                        backgroundColor:
                          milestone.priority === 'High' ? '#FEE2E2' : '#FEF3C7',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.priorityText,
                        {
                          color:
                            milestone.priority === 'High'
                              ? '#DC2626'
                              : '#D97706',
                        },
                      ]}
                    >
                      {milestone.priority}
                    </Text>
                  </View>
                </View>
                <View style={styles.milestoneContent}>
                  <Text style={styles.milestoneTitle}>{milestone.title}</Text>
                  <Text style={styles.milestoneDescription}>
                    {milestone.description}
                  </Text>
                  <View style={styles.milestoneStats}>
                    <View style={styles.milestoneStat}>
                      <Text style={styles.milestoneStatLabel}>
                        Estimated Cost
                      </Text>
                      <Text style={styles.milestoneStatValue}>
                        {milestone.estimatedCost}
                      </Text>
                    </View>
                    <View style={styles.milestoneStat}>
                      <Text style={styles.milestoneStatLabel}>Timeframe</Text>
                      <Text style={styles.milestoneStatValue}>
                        {milestone.timeframe}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Goal Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Popular Goal Categories</Text>
          <View style={styles.categoriesGrid}>
            {goalCategories.map((category) => {
              const IconComponent = category.icon;
              const categoryGoals = goals.filter(
                (goal) => goal.category === category.id
              );
              return (
                <TouchableOpacity
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => {
                    setNewGoal({ ...newGoal, category: category.id });
                    setModalVisible(true);
                  }}
                >
                  <View
                    style={[
                      styles.categoryIcon,
                      { backgroundColor: `${category.color}20` },
                    ]}
                  >
                    <IconComponent size={24} color={category.color} />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.categoryCount}>
                    {categoryGoals.length} goal
                    {categoryGoals.length !== 1 ? 's' : ''}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Add Goal Modal */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add New Financial Goal</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <X size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Goal Title</Text>
                <TextInput
                  style={styles.input}
                  value={newGoal.title}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, title: text })
                  }
                  placeholder="e.g., Buy a Car, House Down Payment"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Target Amount (₹)</Text>
                <TextInput
                  style={styles.input}
                  value={newGoal.amount}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, amount: text })
                  }
                  placeholder="e.g., 1500000"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Target Date</Text>
                <TextInput
                  style={styles.input}
                  value={newGoal.targetDate}
                  onChangeText={(text) =>
                    setNewGoal({ ...newGoal, targetDate: text })
                  }
                  placeholder="YYYY-MM-DD (e.g., 2027-12-31)"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Category</Text>
                <View style={styles.categorySelector}>
                  {goalCategories.map((category) => {
                    const IconComponent = category.icon;
                    return (
                      <TouchableOpacity
                        key={category.id}
                        style={[
                          styles.categorySelectorItem,
                          newGoal.category === category.id &&
                            styles.categorySelectorItemActive,
                        ]}
                        onPress={() =>
                          setNewGoal({ ...newGoal, category: category.id })
                        }
                      >
                        <IconComponent
                          size={20}
                          color={
                            newGoal.category === category.id
                              ? '#FFFFFF'
                              : category.color
                          }
                        />
                        <Text
                          style={[
                            styles.categorySelectorText,
                            newGoal.category === category.id &&
                              styles.categorySelectorTextActive,
                          ]}
                        >
                          {category.name}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
            </ScrollView>

            <TouchableOpacity style={styles.createGoalButton} onPress={addGoal}>
              <CheckCircle size={20} color="#FFFFFF" />
              <Text style={styles.createGoalButtonText}>Create Goal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
    marginTop: 2,
  },
  addButton: {
    backgroundColor: '#2563EB',
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overviewCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 24,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 16,
  },
  overviewStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  overviewStat: {
    alignItems: 'center',
    flex: 1,
  },
  overviewStatValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2563EB',
    textAlign: 'center',
  },
  overviewStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    textAlign: 'center',
  },
  section: {
    marginBottom: 32,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
  },
  challengesContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  challengeCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  challengeReward: {
    fontSize: 12,
    color: '#059669',
    marginTop: 2,
  },
  challengeProgress: {
    alignItems: 'flex-end',
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginBottom: 4,
  },
  progressBar: {
    width: 60,
    height: 4,
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 2,
  },
  goalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  goalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  goalIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  goalInfo: {
    flex: 1,
  },
  goalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  goalAmount: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 2,
  },
  goalRemaining: {
    fontSize: 12,
    color: '#EF4444',
    fontWeight: '600',
  },
  goalProgress: {
    alignItems: 'flex-end',
  },
  progressPercentage: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2563EB',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  goalDetails: {
    gap: 8,
    marginBottom: 16,
  },
  goalDetail: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  goalDetailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  goalActions: {
    flexDirection: 'row',
    gap: 12,
  },
  contributeButton: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  contributeButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  sipButton: {
    flex: 1,
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  sipButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  milestonesContainer: {
    gap: 16,
  },
  milestoneCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  milestoneHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  milestoneNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2563EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  milestoneNumberText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  milestoneContent: {
    flex: 1,
  },
  milestoneTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  milestoneDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  milestoneStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  milestoneStat: {
    flex: 1,
  },
  milestoneStatLabel: {
    fontSize: 12,
    color: '#9CA3AF',
  },
  milestoneStatValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    width: '48%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  categoryIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 12,
    color: '#6B7280',
  },
  tipsContainer: {
    gap: 12,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  tipText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    maxHeight: '85%',
    width: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111827',
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  categorySelectorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 8,
  },
  categorySelectorItemActive: {
    backgroundColor: '#2563EB',
    borderColor: '#2563EB',
  },
  categorySelectorText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#374151',
    marginLeft: 4,
  },
  categorySelectorTextActive: {
    color: '#FFFFFF',
  },
  createGoalButton: {
    backgroundColor: '#10B981',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  createGoalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});
